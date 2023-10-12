import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Role, RoleAttributes } from "../types/Role";
import { Player, PlayerType } from "../types/Player";
import { useNavigate } from "react-router-dom";
import "./NarratorDashboardLobby.css";
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
    socket.on("reset-game", () => {
      navigate("/");
    });
    return () => {
      socket.off("update-roles");
      socket.off("reset-game");
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

  const addRole = (attributes: RoleAttributes) => {
    socket.emit("add-role", attributes);
  };

  const removeRole = (attributes: RoleAttributes) => {
    socket.emit("remove-role", attributes);
  };

  return (
    <div className="narrator-dashboard">
      {isNameSubmitted ? (
        <div>
          <h1 className="narrator-dashboard h1">Narrator Dashboard</h1>
          {
            <div>
              <button
                className="narrator-dashboard button"
                onClick={() => {
                  socket.emit("start-game");
                  // redirects to NarratorDashboardInGame
                  navigate("/narrator-dashboard-in-game");
                }}>
                Start Game
              </button>
              <button className="narrator-dashboard button" onClick={() => socket.emit("reset-game")}>
                Reset Game
              </button>
            </div>
          }
          <p>You are registered as {narratorName}</p>
          {allRoleAttributes.map((role) => (
            <div key={role.name}>
              <h3 className="narrator-dashboard h3">
                {role.name}: {roles.filter((r) => r && r.attributes && r.attributes.name === role.name).length}
              </h3>
              <button className="narrator-dashboard button" onClick={() => addRole(role)}>
                +
              </button>
              <button className="narrator-dashboard button" onClick={() => removeRole(role)}>
                -
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <input className="narrator-dashboard input" type="text" placeholder="Enter your name" onChange={(e) => setNarratorName(e.target.value)} />
          <button className="narrator-dashboard button" onClick={submitName}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default NarratorDashboardLobby;
