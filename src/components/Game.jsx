import React, { useState } from "react";
import image from "../images/scale_1200.png";
function Game() {
  const [score, setScore] = useState(0);

  const handleClick = () => {
    setScore(score + 1);
  };

  return (
    <div className="game-container">
      <h1>Datester</h1>
      <div onClick={handleClick}>
        <img className="tap" src={image} alt="Click" />
      </div>
      <p>Total Score: {score}</p>
    </div>
  );
}

export default Game;
