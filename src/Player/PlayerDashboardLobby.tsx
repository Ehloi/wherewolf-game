import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Player, PlayerType } from "../types/Player";
import { Role, RoleName, RoleIcon, RoleDescription } from "../types/Role";
import { useNavigate } from "react-router-dom";
import "./PlayerDashboardLobby.css"; // Import the CSS file
import "../Styles/roleStyles.css"; // Import the CSS file
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

const PlayerDashboardLobby: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [hasEnteredName, setHasEnteredName] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [playerInfo, setPlayerInfo] = useState<Player>();
  const allRoleNames = Object.values(RoleName);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const playerId: string = socket.id;

  useEffect(() => {
    console.log("Socket url:", socketUrl);
    socket.on("update-players", (updatedPlayers: Player[]) => {
      setPlayers(updatedPlayers);
      if (!updatedPlayers.find((player) => player.id === playerId)) {
        console.log(`Player with id ${playerId} not found`);
        return;
      }
      const playerUpdated: Player = updatedPlayers.find((player) => player.id === playerId)!;
      setPlayerInfo(playerUpdated);
    });
    socket.on("update-roles", (newRoles: Role[]) => {
      setRoles(newRoles);
    });
    socket.on("start-game", () => {
      navigate("/player-dashboard-in-game", {
        state: { playerId: playerId },
      });
    });
    socket.on("reset-game", () => {
      navigate("/");
    });

    // Cleanup to avoid multiple listeners
    return () => {
      socket.off("reset-game");
      socket.off("update-roles");
      socket.off("update-players");
    };
  }, []);

  useEffect(() => {
    socket.on("start-game", () => {
      navigate("/player-dashboard-in-game", {
        state: { playerId: playerId },
      });
    });
    return () => {
      socket.off("start-game");
    };
  }, []);
  const toggleRoleDescription = (roleName: string) => {
    if (selectedRole === roleName) {
      setSelectedRole(null);
    } else {
      setSelectedRole(roleName);
    }
  };

  const submitName = () => {
    const newPlayer: Player = {
      id: playerId,
      name,
      playerType: PlayerType.PLAYER,
      role: null,
      isAlive: true,
    };
    setPlayerInfo(newPlayer);
    socket.emit("set-player", newPlayer);
    console.log("New player created: ", newPlayer, "\n");
    setHasEnteredName(true);
  };
  return (
    <div className="lobby-dashboard">
      {/* <img src="https://i.ibb.co/SXh3Hpm/Wherere-Wolfs-Logo-removebg-preview-modified.png" alt="Game Logo" className="game-logo" /> */}
      {!hasEnteredName ? (
        <div className="lobby">
          <h1 className="lobby-title">Enter your name</h1>

          <div className="input-button-wrapper">
            <input className="custom-name-input" type="text" onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submitName()} />
            <button className="submit-button" onClick={submitName}>
              Submit
            </button>
          </div>
        </div>
      ) : (
        <div className="player-info-section">
          <h1> Waiting for the narrator to start the game...</h1>
          <h2 className="welcome-message">Welcome, {name}!</h2>
          <h3 className="current-players">
            Current Players:{" "}
            {players
              .filter((player) => player.playerType === "Player")
              .map((player) => player.name)
              .join(", ")}
          </h3>
          <h3 className="narrator-info">
            {"Narrator: " + `${players.find((player) => player.playerType === "Narrator") ? players.find((player) => player.playerType === "Narrator")?.name : "No narrator yet"}` + "\n"}
          </h3>
          <div className="card-section">
            {
              <div className="role-info">
                {allRoleNames.map((name) => {
                  const numberOfRoles = roles.filter((role: Role) => role && role.attributes && role.attributes.name === name).length;
                  const isSelected = selectedRole === name;

                  return (
                    <div className={`role-card ${isSelected ? "expanded" : ""}`} onClick={() => toggleRoleDescription(name)}>
                      <img src={RoleIcon[name.replaceAll(" ", "_").toUpperCase() as keyof typeof RoleIcon]} alt={`${name} icon`} className="role-icon" />
                      <h3 className="role-count">
                        {name}: {numberOfRoles}
                      </h3>
                      {isSelected && (
                        <p
                          className="role-description"
                          dangerouslySetInnerHTML={{ __html: RoleDescription[name.replaceAll(" ", "_").toUpperCase() as keyof typeof RoleDescription].trim().replaceAll("\n", "<br>") }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerDashboardLobby;
