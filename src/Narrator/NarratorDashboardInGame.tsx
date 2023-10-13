import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Role, RoleName } from "../types/Role";
import { Player, PlayerType } from "../types/Player";
import { useNavigate } from "react-router-dom";
import { narratorScript } from "./script";
import "./NarratorDashboardInGame.css"; // Import the CSS

const socket = io("http://localhost:3001");

const NarratorDashboardInGame: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [alivePlayers, setAlivePlayers] = useState<Player[]>([]);
  const [aliveRoles, setAliveRoles] = useState<{ name: RoleName | undefined; number: number }[]>([]);
  const [script, setScript] = useState<string[]>([]);

  const allRoleNames = Object.values(RoleName);
  const navigate = useNavigate();
  useEffect(() => {
    socket.on("update-players", (updatedPlayers: Player[]) => {
      // Update players
      setPlayers(updatedPlayers);
      // Update alive players
      setAlivePlayers(updatedPlayers.filter((player) => player.isAlive));
      // Update alive roles
      const aliveRolesArray = allRoleNames.map((name) => ({
        name,
        number: updatedPlayers.filter((player) => player.isAlive && player.role?.attributes.name === name).length,
      }));
      setAliveRoles(aliveRolesArray);
    });
    socket.on("reset-game", () => {
      navigate("/");
    });
    // Update roles
    socket.on("update-roles", (newRoles: Role[]) => {
      setRoles(newRoles);
    });
    return () => {
      socket.off("update-players");
      socket.off("reset-game");
      socket.off("update-roles");
    };
  }, []);

  const switchPlayerAliveState = (playerId: string) => {
    socket.emit("switch-player-alive-state", playerId);
  };
  const switchPlayerIsGoodState = (playerId: string) => {
    socket.emit("switch-is-good", playerId);
  };
  const updateScript = () => {
    setScript(narratorScript(players));
  };

  return (
    <div className="narrator-dashboard-in-game">
      <div className="dashboard-container">
        <h1 className="dashboard-title">Narrator Dashboard</h1>
        <div className="player-list">
          {players
            .filter((p) => p.playerType === PlayerType.PLAYER)
            .map((player) => (
              <div className="player-card" key={player.name}>
                <h3 className="player-info">
                  Name: {player.name} - Role: {player.role?.attributes.name} - Status: {player.isAlive ? "Alive" : "Dead"}
                </h3>
                <button className="kill-button" onClick={() => switchPlayerAliveState(player.id)}>
                  Kill {player.name}
                </button>
                <button className="revive-button" onClick={() => switchPlayerAliveState(player.id)}>
                  Revive {player.name}
                </button>
              </div>
            ))}
        </div>
        <div className="game-controls">
          <h3 className="game-status">
            <button className="update-script-button" onClick={() => updateScript()}>
              Update Scripts
            </button>
            {script}
            {alivePlayers.filter((player) => player.role?.attributes.isGood).length < alivePlayers.filter((player) => player.role?.attributes.isGood === false).length
              ? "Werewolves win!"
              : alivePlayers.filter((player) => player.role?.attributes.name === RoleName.WEREWOLF).length === 0
              ? "Villagers win!"
              : "Game is still going"}
          </h3>
          <button className="reset-button" onClick={() => socket.emit("reset-game")}>
            Reset Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default NarratorDashboardInGame;
