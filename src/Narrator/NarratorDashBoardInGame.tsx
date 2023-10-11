import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Role, RoleAttributes, RoleName } from "../types/Role";
import { Player, PlayerType } from "../types/Player";
const socket = io("http://localhost:3001");

const NarratorDashboardInGame: React.FC = () => {
  const [narratorName, setNarratorName] = useState<string>("");
  const [isNameSubmitted, setIsNameSubmitted] = useState<boolean>(false);
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {}, []);

  const switchPlayerAliveState = (player: Player) => {
    socket.emit("switch-player-alive-state", player);
  };

  return (
    <div>
      <div>
        <h1>Narrator Dashboard</h1>
        {players.map((player) => (
          <div key={player.name}>
            <h3>
              Name:{player.name} - Role: {player.role?.roleAttributes.roleName} - Status: {player.isAlive ? "Alive" : "Dead"}
            </h3>
            <button onClick={() => switchPlayerAliveState(player)}>Kill {player.name}</button>
            <button onClick={() => switchPlayerAliveState(player)}>Revive {player.name}</button>
          </div>
        ))}
        {
          <div>
            <h3>
              {players.filter((player) => player.isAlive && player.role?.roleAttributes.isGood).length === 0
                ? "Werewolves win!"
                : players.filter((player) => player.isAlive && player.role?.roleAttributes.roleName === RoleName.WEREWOLF).length === 0
                ? "Villagers win!"
                : "Game is still going"}
            </h3>
          </div>
        }
      </div>
    </div>
  );
};

export default NarratorDashboardInGame;
