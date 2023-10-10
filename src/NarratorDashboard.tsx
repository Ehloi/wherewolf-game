import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import {Role, RoleName} from './types/Role';
import {Player, PlayerType} from './types/Player';
const socket = io('http://localhost:3001');

const NarratorDashboard: React.FC = () => {
  const [narratorName, setNarratorName] = useState<string>('');
  const [isNameSubmitted, setIsNameSubmitted] = useState<boolean>(false);
  const [roles, setRoles] = useState<Role[]>([]);
  const allRoleNames = Object.values(RoleName);

  useEffect(() => {
    socket.on('update-roles', (newRoles: Role[]) => {
      setRoles(newRoles);
    });
    return () => {
      socket.off('update-roles');
    };
  }, []);

  const submitName = () => {
    setIsNameSubmitted(true);
    const newPlayer: Player = {
      id: socket.id,
      name: narratorName,
      playerType: PlayerType.NARRATOR,
      role: null,
    };
    socket.emit('set-player', newPlayer);
  };

  const addRole = (roleName: RoleName) => {
    socket.emit('add-role', roleName);
  };

  const removeRole = (roleName: RoleName) => {
    socket.emit('remove-role', roleName);
  };

  return (
    <div>
      {isNameSubmitted ? (
        <div>
          <h1>Narrator Dashboard</h1>
          {allRoleNames.map((roleName) => (
            <div key={roleName}>
              <h3>{roleName}: {roles.filter(role => role.roleType === roleName).length}</h3>
              <button onClick={() => addRole(roleName)}>Add {roleName}</button>
              <button onClick={() => removeRole(roleName)}>Remove {roleName}</button>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <input type="text" placeholder="Enter your name" onChange={(e) => setNarratorName(e.target.value)} />
          <button onClick={submitName}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default NarratorDashboard;
