import React from 'react';
import { useNavigate } from 'react-router-dom';

const GameLobby: React.FC = () => {
  const navigate = useNavigate();

  const handleChoice = (role: string) => {
    if (role === 'player') {
      navigate('/player-dashboard');
    } else {
      navigate('/narrator-dashboard');
    }
  };

  return (
    <div>
      <h1>Welcome to the Game Lobby</h1>
      <button onClick={() => handleChoice('player')}>I am a Player</button>
      <button onClick={() => handleChoice('narrator')}>I am the Narrator</button>
    </div>
  );
};

export default GameLobby;
