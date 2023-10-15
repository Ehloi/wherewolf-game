import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Role, RoleAttributes } from "../types/Role";
import { Player, PlayerType } from "../types/Player";
import { useNavigate } from "react-router-dom";
import "../index.css";
import "./NarratorDashboardLobby.css";

let port;
let socketUrl: string = "";

if (process.env.NODE_ENV === "development") {
  port = process.env.REACT_APP_PORT || 3001;
  socketUrl = `${process.env.REACT_APP_SOCKET_LINK}:${port}`;
}
if (process.env.NODE_ENV === "production") {
  socketUrl = process.env.REACT_APP_SOCKET_LINK!;
}

const socket = io(socketUrl);

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
      <img src="https://i.ibb.co/SXh3Hpm/Wherere-Wolfs-Logo-removebg-preview-modified.png" alt="Game Logo" className="game-logo" />

      {isNameSubmitted ? (
        <div className="centered-content">
          <h1>Narrator Dashboard</h1>
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
          <div className="role-info">
            {allRoleAttributes.map((role) => (
              <div className="role-card" key={role.name}>
                <h3>
                  {role.name}: {roles.filter((r) => r && r.attributes && r.attributes.name === role.name).length}
                </h3>
                <div className="role-button-wrapper">
                  {" "}
                  {/* New wrapper for the buttons */}
                  <button className="role-button narrator-dashboard button" onClick={() => addRole(role)}>
                    +
                  </button>
                  <button className="role-button narrator-dashboard button" onClick={() => removeRole(role)}>
                    -
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="lobby">
          <h1 className="lobby-title">Enter your name</h1>
          <div className="input-button-wrapper">
            <input className="custom-name-input" type="text" placeholder="Enter your name" onChange={(e) => setNarratorName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submitName()} />
            <button className="submit-button" onClick={submitName}>
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NarratorDashboardLobby;
