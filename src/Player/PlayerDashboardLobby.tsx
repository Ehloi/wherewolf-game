import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./PlayerDashboard.css";
import { Player, PlayerType } from "../types/Player";
import { Role, RoleName } from "../types/Role";
import { useNavigate } from "react-router-dom";
const socket = io("http://localhost:3001");

const PlayerDashboardLobby: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [hasEnteredName, setHasEnteredName] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [playerInfo, setPlayerInfo] = useState<Player>();
  const allRoleNames = Object.values(RoleName);
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

    // Cleanup to avoid multiple listeners
    return () => {
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
    <div>
      <h1>Waiting for the game to start...</h1>
      {!hasEnteredName ? (
        <div>
          <input type="text" onChange={(e) => setName(e.target.value)} />
          <button onClick={submitName}>Submit</button>
        </div>
      ) : (
        <div>
          <h2>Welcome, {name}!</h2>
          <h3>
            Current Players:{" "}
            {players
              .filter((player) => player.playerType === "Player")
              .map((player) => player.name)
              .join(", ")}
          </h3>
          <h3>
            {"Narrator: " +
              `${
                players.find((player) => player.playerType === "Narrator")
                  ? players.find((player) => player.playerType === "Narrator")?.name
                  : "No narrator yet"
              }` +
              "\n"}
          </h3>
          <h3>
            {allRoleNames.map((roleName) => (
              <h3>
                {roleName}: {roles.filter((role) => role.roleAttributes.roleName === roleName).length}
              </h3>
            ))}
          </h3>
        </div>
      )}
    </div>
  );
};

export default PlayerDashboardLobby;
