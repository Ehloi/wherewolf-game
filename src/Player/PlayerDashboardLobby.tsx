import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Player, PlayerType } from "../types/Player";
import { Role, RoleName, RoleIcon, RoleDescription } from "../types/Role";
import { useNavigate } from "react-router-dom";
import "./PlayerDashboardLobby.css"; // Import the CSS file
import "../Styles/roleStyles.css"; // Import the CSS file
const socket = io("http://localhost:3001");
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
      <h1 className="lobby-title">Waiting for the game to start...</h1>
      {!hasEnteredName ? (
        <div className="name-input-section">
          <input className="name-input" type="text" onChange={(e) => setName(e.target.value)} />
          <button className="submit-button" onClick={submitName}>
            Submit
          </button>
        </div>
      ) : (
        <div className="player-info-section">
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
        </div>
      )}
    </div>
  );
};

export default PlayerDashboardLobby;
