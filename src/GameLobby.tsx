import React from "react";
import { useNavigate } from "react-router-dom";
import { RoleAttributes } from "./types/Role";
import { PlayerType } from "./types/Player";
import "./GameLobby.css";
const GameLobby: React.FC = () => {
  const navigate = useNavigate();

  const handleChoice = (role: string) => {
    if (role === PlayerType.PLAYER) {
      navigate("/player-dashboard-lobby");
    } else {
      navigate("/narrator-dashboard-lobby");
    }
  };

  return (
    <div className="game-lobby-container">
      <img src="https://i.ibb.co/SXh3Hpm/Wherere-Wolfs-Logo-removebg-preview-modified.png" alt="Game Logo" className="game-logo" />
      <h1 className="game-title">Welcome to the Murdoch University Werewolf</h1> <button onClick={() => handleChoice(PlayerType.PLAYER)}>I am a Player</button>
      <button onClick={() => handleChoice(PlayerType.NARRATOR)}>I am the Narrator</button>
    </div>
  );
};

export default GameLobby;
