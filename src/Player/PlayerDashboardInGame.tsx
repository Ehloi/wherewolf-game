import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./PlayerDashboard.css";
import { Player, PlayerType } from "../types/Player";
import { Role, RoleName } from "../types/Role";
import { useLocation } from "react-router-dom";
const socket = io("http://localhost:3001");

const PlayerDashboardInGame: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [playerInfo, setPlayerInfo] = useState<Player>();
  const [alivePlayers, setAlivePlayers] = useState<Player[]>([]);
  const [aliveRoles, setAliveRoles] = useState<{ roleName: RoleName | undefined; number: Number }[]>([]);
  const allRoleNames = Object.values(RoleName);
  const playerId: string = useLocation().state.playerId;
  console.log(playerId);

  useEffect(() => {
    // Updates players, alive roles, alive players and player info
    socket.on("update-players", (updatedPlayers: Player[]) => {
      // Update players
      setPlayers(updatedPlayers);
      if (!updatedPlayers.find((player) => player.id === playerId)) {
        console.log(`Player with id ${playerId} not found`);
        return;
      }
      const playerUpdated: Player = updatedPlayers.find((player) => player.id === playerId)!;

      // Update player info
      setPlayerInfo(playerUpdated);

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

    // Cleanup to avoid multiple listeners
    return () => {
      socket.off("update-roles");
      socket.off("update-players");
    };
  }, []);

  const loadAllInfo = () => {
    // Ask for the server to update all info
    socket.emit("update-all");
  };
  loadAllInfo();

  return (
    <div>
      <h1>Player Dashboard</h1>
      <p>
        <strong>The game has started, {playerInfo?.name}</strong>
      </p>
      <p>
        <strong>Your role is: </strong> {playerInfo?.role?.roleAttributes.roleName}
      </p>
      <p>
        <strong>Your role desciption: {playerInfo?.role?.roleAttributes.roleDescription}</strong>
      </p>
      <strong>Status: </strong> {playerInfo?.isAlive ? "Alive" : "☠️"}
      <div className={`status-indicator ${playerInfo?.isAlive ? "alive-indicator" : "dead-indicator"}`}></div>
      <h3>Players: </h3>
      {players
        .filter((p: Player) => p.playerType === PlayerType.PLAYER)
        .map((p: Player) => (
          <div key={p.name}>
            <h3>
              Name: {p.name} - Status: {p.isAlive ? "Alive" : "Dead"}
            </h3>
          </div>
        ))}
      <h3>Roles: </h3>
      Remaining characters: <br />
      {aliveRoles.map((role) => (
        <div key={role?.roleName}>
          <h3>
            {role?.roleName} : {role?.number.toString()}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default PlayerDashboardInGame;
