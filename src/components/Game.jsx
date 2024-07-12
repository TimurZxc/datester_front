import React, { useState, useEffect } from "react";
import image from "../images/scale_1200.png";

function Game() {
  const [score, setScore] = useState(() => {
    const savedScore = localStorage.getItem('score');
    return savedScore !== null ? JSON.parse(savedScore) : 0;
  });
  const [stamina, setStamina] = useState(() => {
    const savedStamina = localStorage.getItem('stamina');
    return savedStamina !== null ? JSON.parse(savedStamina) : 100;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStamina(prevStamina => {
        const newStamina = Math.min(prevStamina + 1, 100);
        localStorage.setItem('stamina', JSON.stringify(newStamina));
        return newStamina;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    if (stamina > 0) {
      const newScore = score + 1;
      const newStamina = stamina - 1;
      setScore(newScore);
      setStamina(newStamina);
      localStorage.setItem('score', JSON.stringify(newScore));
      localStorage.setItem('stamina', JSON.stringify(newStamina));
    }
  };

  return (
    <div className="game-container">
      <h1>Datester</h1>
      <div onClick={handleClick}>
        <img className="tap" src={image} alt="Click" />
      </div>
      <p>Total Score: {score}</p>
      <progress value={stamina} max="100" className="stamina-bar"></progress>
    </div>
  );
}

export default Game;
