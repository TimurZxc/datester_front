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
  const [inscriptions, setInscriptions] = useState([]);

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

  const handleClick = (event) => {
    if (stamina > 0) {
      const newScore = score + 1;
      const newStamina = stamina - 1;
      setScore(newScore);
      setStamina(newStamina);
      localStorage.setItem('score', JSON.stringify(newScore));
      localStorage.setItem('stamina', JSON.stringify(newStamina));

      const clickX = event.clientX;
      const clickY = event.clientY;
      const newInscription = {
        id: Date.now(),
        x: clickX + (Math.random() * 20 - 10), // random offset
        y: clickY + (Math.random() * 20 - 10), // random offset
      };
      setInscriptions(prevInscriptions => [...prevInscriptions, newInscription]);

      setTimeout(() => {
        setInscriptions(prevInscriptions =>
          prevInscriptions.filter(inscription => inscription.id !== newInscription.id)
        );
      }, 1000); // remove after 1 second
    }
  };

  return (
    <div className="game-container" onClick={handleClick}>
      <h1>Datester</h1>
      <div>
        <img className="tap" src={image} alt="Click" />
      </div>
      <p>Total Score: {score}</p>
      <progress value={stamina} max="100" className="stamina-bar"></progress>
      {inscriptions.map(inscription => (
        <span
          key={inscription.id}
          className="inscription"
          style={{ left: `${inscription.x}px`, top: `${inscription.y}px` }}
        >
          +1
        </span>
      ))}
    </div>
  );
}

export default Game;
