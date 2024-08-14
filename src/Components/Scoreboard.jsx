import React from "react";

const Scoreboard = ({ score, bestScore }) => {
  return (
    <div className="scoreboard">
      
        <strong>Score:</strong> 
        <span>{score}</span>
        
        <strong>Best Score:</strong> 
        <span>{bestScore}</span>
    </div>
  );
};

export default Scoreboard;
