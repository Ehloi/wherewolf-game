import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Role, RoleAttributes, RoleName } from "../types/Role";
import { Player, PlayerType } from "../types/Player";
const socket = io("http://localhost:3001");

const NarratorDashboardInGame: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [alivePlayers, setAlivePlayers] = useState<Player[]>([]);
  const [aliveRoles, setAliveRoles] = useState<{ roleName: RoleName | undefined; number: Number }[]>([]);
  const allRoleNames = Object.values(RoleName);
  useEffect(() => {
    socket.on("update-players", (updatedPlayers: Player[]) => {
      // Update players
      setPlayers(updatedPlayers);
      // Update alive players
      setAlivePlayers(updatedPlayers.filter((player) => player.isAlive));
      // Update alive roles
      const aliveRolesArray = allRoleNames.map((roleName) => ({
        roleName,
        number: updatedPlayers.filter((player) => player.isAlive && player.role?.roleAttributes.roleName === roleName).length,
      }));
      setAliveRoles(aliveRolesArray);
    });
    // Update roles
    socket.on("update-roles", (newRoles: Role[]) => {
      setRoles(newRoles);
    });
    return () => {
      socket.off("update-players");
      socket.off("update-roles");
    };
  }, []);

  const switchPlayerAliveState = (playerId: string) => {
    socket.emit("switch-player-alive-state", playerId);
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
            <button onClick={() => switchPlayerAliveState(player.id)}>Kill {player.name}</button>
            <button onClick={() => switchPlayerAliveState(player.id)}>Revive {player.name}</button>
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
