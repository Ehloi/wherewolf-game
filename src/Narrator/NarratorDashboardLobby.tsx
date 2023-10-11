import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Role, RoleAttributes } from "../types/Role";
import { Player, PlayerType } from "../types/Player";
import { useNavigate } from "react-router-dom";
const socket = io("http://localhost:3001");

const NarratorDashboardLobby: React.FC = () => {
  const navigate = useNavigate();

  const [narratorName, setNarratorName] = useState<string>("");
  const [isNameSubmitted, setIsNameSubmitted] = useState<boolean>(false);
  const [roles, setRoles] = useState<Role[]>([]);
  const allRoleAttributes: RoleAttributes[] = Object.values(RoleAttributes);
  useEffect(() => {
    socket.on("update-roles", (newRoles: Role[]) => {
      setRoles(newRoles);
    });
    return () => {
      socket.off("update-roles");
    };
  }, []);

  const submitName = () => {
    setIsNameSubmitted(true);
    const newPlayer: Player = {
      id: socket.id,
      name: narratorName,
      playerType: PlayerType.NARRATOR,
      role: null,
    };
    socket.emit("set-player", newPlayer);
  };

  const addRole = (roleAttributes: RoleAttributes) => {
    socket.emit("add-role", roleAttributes);
  };

  const removeRole = (roleAttributes: RoleAttributes) => {
    socket.emit("remove-role", roleAttributes);
  };

  return (
    <div>
      {isNameSubmitted ? (
        <div>
          <h1>Narrator Dashboard</h1>
          {allRoleAttributes.map((role) => (
            <div key={role.roleName}>
              <h3>
                {role.roleName}: {roles.filter((r) => r.roleAttributes.roleName === role.roleName).length}
              </h3>
              <button onClick={() => addRole(role)}>Add {role.roleName}</button>
              <button onClick={() => removeRole(role)}>Remove {role.roleName}</button>
            </div>
          ))}
          {
            <div>
              <button
                onClick={() => {
                  socket.emit("start-game");
                  // redirects to NarratorDashboardInGame
                  navigate("/narrator-dashboard-in-game");
                }}>
                Start Game
              </button>
            </div>
          }
        </div>
      ) : (
        <div>
          <input type="text" placeholder="Enter your name" onChange={(e) => setNarratorName(e.target.value)} />
          <button onClick={submitName}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default NarratorDashboardLobby;
