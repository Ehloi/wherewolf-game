import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Player, PlayerType } from "../types/Player";
import { Role, RoleName, RoleDescription, RoleIcon } from "../types/Role";
import { useLocation, useNavigate } from "react-router-dom";
import "./PlayerDashboardInGame.css"; // Import the CSS file
import "../Styles/roleStyles.css";

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

const PlayerDashboardInGame: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [playerInfo, setPlayerInfo] = useState<Player>();
  const [alivePlayers, setAlivePlayers] = useState<Player[]>([]);
  const [aliveRoles, setAliveRoles] = useState<{ name: RoleName | undefined; number: number }[]>([]);
  const allRoleNames = Object.values(RoleName);
  const playerId: string = useLocation().state.playerId;
  const navigate = useNavigate();
  useEffect(() => {
    loadAllInfo();
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
      const aliveRolesArray = allRoleNames.map((name) => ({
        name,
        number: updatedPlayers.filter((player) => player.isAlive && player.role?.attributes.name === name).length,
      }));
      aliveRoles.filter((role) => role.number > 0);
      setAliveRoles(aliveRolesArray);
    });

    socket.on("reset-game", () => {
      navigate("/");
    });
    // Update roles
    socket.on("update-roles", (newRoles: Role[]) => {
      setRoles(newRoles);
    });

    // Cleanup to avoid multiple listeners
    return () => {
      socket.off("reset-game");
      socket.off("update-roles");
      socket.off("update-players");
    };
  }, []);

  const loadAllInfo = () => {
    // Ask for the server to update all info
    socket.emit("update-all");
  };

  return (
    <div className="player-dashboard-in-game">
      <h1 className="dashboard-title">Player Dashboard</h1>
      <p className="game-start-message">
        <strong>The game has started, {playerInfo?.name}</strong>
      </p>
      <p className="role-info">
        <strong>Your role is: </strong> {playerInfo?.role?.attributes.name}
      </p>
      <p className="role-description">
        <strong>Your role description: {playerInfo?.role?.attributes.description}</strong>
      </p>
      <p className="status">
        <strong>Status: </strong> {playerInfo?.isAlive ? "Alive" : "☠️"}
      </p>
      <div className={`status-indicator ${playerInfo?.isAlive ? "alive-indicator" : "dead-indicator"}`}></div>

      <h3 className="players-title">Players:</h3>
      <div className="player-list">
        {players
          .filter((p: Player) => p.playerType === PlayerType.PLAYER)
          .map((p: Player) => (
            <div className="player-card" key={p.name}>
              <h3 className="player-info">
                Name: {p.name} - Status: {p.isAlive ? "Alive" : "Dead"}
              </h3>
            </div>
          ))}
      </div>

      <h3 className="roles-title">Roles:</h3>
      <div className="role-list">
        Remaining characters: <br />
        {aliveRoles
          .filter((role) => role.number > 0)
          .map((role) => (
            <div className="role-card" key={role?.name}>
              <img src={RoleIcon[role?.name?.replaceAll(" ", "_").toUpperCase() as keyof typeof RoleIcon]} alt={`${role?.name} icon`} className="role-icon" />
              <h3 className="role-info">
                {role?.name} : {role?.number.toString()}
              </h3>
              <p
                className="role-description"
                dangerouslySetInnerHTML={{ __html: RoleDescription[role?.name?.replaceAll(" ", "_").toUpperCase() as keyof typeof RoleDescription]?.trim().replaceAll("\n", "<br>") }}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default PlayerDashboardInGame;
