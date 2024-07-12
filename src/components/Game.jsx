import React, { useState, useEffect } from "react";
import image from "../images/scale_1200.png";

function Game() {
  const [score, setScore] = useState(() => {
    const savedScore = localStorage.getItem("score");
    return savedScore !== null ? JSON.parse(savedScore) : 0;
  });
  const [stamina, setStamina] = useState(() => {
    const savedStamina = localStorage.getItem("stamina");
    return savedStamina !== null ? JSON.parse(savedStamina) : 100;
  });
  const [inscriptions, setInscriptions] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStamina((prevStamina) => {
        const newStamina = Math.min(prevStamina + 1, 100);
        localStorage.setItem("stamina", JSON.stringify(newStamina));
        return newStamina;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleTapClick = (event) => {
    if (stamina > 0) {
      const newScore = score + 1;
      const newStamina = stamina - 1;
      setScore(newScore);
      setStamina(newStamina);
      localStorage.setItem("score", JSON.stringify(newScore));
      localStorage.setItem("stamina", JSON.stringify(newStamina));

      const tapElement = event.currentTarget.getBoundingClientRect();
      const clickX = event.clientX - tapElement.left;
      const clickY = event.clientY - tapElement.top;
      const randomOffsetX = Math.random() * 40 - 20; // random offset between -20 and 20
      const randomOffsetY = Math.random() * 40 - 20; // random offset between -20 and 20
      const newInscription = {
        id: Date.now(),
        x: clickX + randomOffsetX,
        y: clickY + randomOffsetY,
      };
      setInscriptions((prevInscriptions) => [
        ...prevInscriptions,
        newInscription,
      ]);

      setTimeout(() => {
        setInscriptions((prevInscriptions) =>
          prevInscriptions.filter(
            (inscription) => inscription.id !== newInscription.id
          )
        );
      }, 300); // remove after 300ms
    }
  };

  return (
    <div className="game-container">
      <h1>Datester</h1>
      <div className="tap" onClick={handleTapClick} style={{ position: 'relative' }}>
        <img className="tap" src={image} alt="Click" />
        {inscriptions.map((inscription) => (
          <span
            key={inscription.id}
            className="inscription"
            style={{ left: `${inscription.x}px`, top: `${inscription.y}px`, position: 'absolute' }}
          >
            +1
          </span>
        ))}
      </div>
      <p>Total Score: {score}</p>
      <progress value={stamina} max="100" className="stamina-bar"></progress>
    </div>
  );
}

export default Game;
  