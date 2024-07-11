import React, { useState } from "react";
function Game() {
  const [score, setScore] = useState(0);

  const handleClick = () => {
    setScore(score + 1);
  };

  return (
    <div className="game-container">
      <h1>Datester</h1>
      <div
        className="clicker"
        onClick={handleClick}
        style={{
          width: "200px",
          height: "200px",
          backgroundColor: "lightblue",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        Click me!
      </div>
      <p>Total Score: {score}</p>
    </div>
  );
}

export default Game;
