import React, { useState, useEffect } from 'react';
import { io } from "socket.io-client";
import "./PlayerDashboard.css";
import { Player, PlayerType } from './types/Player';
import { Role, RoleName } from './types/Role';
const socket = io("http://localhost:3001");

const PlayerDashboard: React.FC = () => {
    const [name, setName] = useState('');
    const [hasEnteredName, setHasEnteredName] = useState(false);
    const [hasGameStarted, setHasGameStarted] = useState(false);
    const [players, setPlayers] = useState<Player[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);
    const [role, setRole] = useState<string>('Citizen'); // Assume 'Citizen' as default role
    const [isAlive, setIsAlive] = useState<boolean>(true); // Assume the player starts alive
    const allRoleNames = Object.values(RoleName);
    // TODO: update roles when player arrives
    useEffect(() => {
        socket.on('game-started', () => setHasGameStarted(false));
        socket.on('update-players', (updatedPlayers: Player[]) => setPlayers(updatedPlayers));
        socket.on('update-roles', (newRoles: Role[]) => setRoles(newRoles));
        socket.on('assign-role', (assignedRole: string) => setRole(assignedRole));
        socket.on('player-status', (status: boolean) => setIsAlive(status));
        
        // Cleanup to avoid multiple listeners
        return () => {
            socket.off('assign-role');
            socket.off('player-status');
            socket.off('game-started');
            socket.off('update-players');
            socket.off('update-narrator');
            socket.off('update-roles');
        };
      }, []);
  
    const submitName = () => {
        const newPlayer: Player = {
            id: socket.id,
            name,
            playerType: PlayerType.PLAYER,
            role: null,
        };
        socket.emit('set-player', newPlayer);
        console.log('New player created: ', newPlayer, "\nAll players rn:", players);
        setHasEnteredName(true);
    };
  
    return (
        <div>
            {!hasGameStarted ? (
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
                            <h3>Current Players: {players.filter(player => player.playerType === "Player").map(player => player.name).join(', ')}</h3>
                            <h3>{"Narrator: " + `${players.find((player)=> player.playerType === "Narrator") ? players.find((player)=> player.playerType === "Narrator")?.name: 'No narrator yet' }` + '\n'}</h3>
                            <h3>{allRoleNames.map((roleName) => (
                            <h3>{roleName}: {roles.filter(role => role.roleType === roleName).length}</h3>
                            ))}</h3>
                        </div>
                    )}
                </div>
            ) : (
                <div>
          <h1>Player Dashboard</h1>
          <p><strong>Role: </strong> {role} </p>
          <p><strong>Status: </strong> {isAlive ? 'Alive' : 'Dead'} </p>
          <div className={`status-indicator ${isAlive ? 'alive-indicator' : 'dead-indicator'}`}></div>
        </div>
            )}
        </div>
    );
};

export default PlayerDashboard;