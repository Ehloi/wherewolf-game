import React, { useState, useEffect } from 'react';
import { io } from "socket.io-client";
import "./PlayerDashboard.css";
const socket = io("http://localhost:3001");

const PlayerDashboard: React.FC = () => {
    const [name, setName] = useState('');
    const [hasEnteredName, setHasEnteredName] = useState(false);
    const [hasGameStarted, setHasGameStarted] = useState(false);
    const [players, setPlayers] = useState<string[]>([]);
    const [narrator, setNarrator] = useState('');
    const [roles, setRoles] = useState<string[]>([]);
    const [role, setRole] = useState<string>('Citizen'); // Assume 'Citizen' as default role
    const [isAlive, setIsAlive] = useState<boolean>(true); // Assume the player starts alive
  
    useEffect(() => {
        socket.on('game-started', () => setHasGameStarted(true));
        socket.on('update-players', (updatedPlayers: string[]) => setPlayers(updatedPlayers));
        socket.on('update-narrator', (newNarrator: string) => setNarrator(newNarrator));
        socket.on('update-roles', (newRoles: string[]) => setRoles(newRoles));
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
        socket.emit('set-name', name);
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
                            <h3>Current Players: {"Players: " + players.join(', ') + "\n Narrator: " + narrator}</h3>
                            <h3>Roles in this game: {roles.join(', ')}</h3>
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