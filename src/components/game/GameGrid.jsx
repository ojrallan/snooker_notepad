import { useState, useEffect } from "react";

import { initialBalls } from "../data/initialBalls";
import SnookerBall from "./SnookerBall";

function GameGrid({ currentPlayer, playerObjects, onAddScore }) {
  const [alt, setAlt] = useState(false);
  const [balls, setBalls] = useState(initialBalls);
  const [highestScore, setHighestScore] = useState(0);

  useEffect(() => {
    checkPlayersStatus();
  }, [playerObjects, balls]);

  function handleDisableBall(number) {
    onAddScore(number);

    setBalls((balls) =>
      balls.map((ball) =>
        ball.ballValue === number ? { ...ball, disabled: true } : ball,
      ),
    );
  }

  function checkPlayersStatus() {
    const ballsLeft = balls.filter((ball) => !ball.disabled);

    const scoreLeft = ballsLeft.reduce((sum, ball) => sum + ball.ballValue, 0);

    let highest = 0;

    console.log(playerObjects);

    for (const player of playerObjects) {
      const playerScore = player.scores.reduce((sum, score) => sum + score, 0);

      console.log(playerScore);

      if (playerScore > highest) {
        highest = playerScore;
      }
    }

    setHighestScore(highest);

    console.log("Highest Score: ", highest);

    for (const player of playerObjects) {
      const playerScore = player.scores.reduce((sum, score) => sum + score, 0);

      if (playerScore + scoreLeft < highestScore) {
        alert(`${player.name} has been eliminated`);
      }
    }
  }

  function handleAlt() {
    setAlt((prev) => !prev);
    console.log(alt);
  }
  return (
    <div className="grid grid-cols-3 gap-2 mx-auto w-[80%] mt-6">
      {balls.map((ball) => (
        <SnookerBall
          onDisableBall={handleDisableBall}
          number={ball.ballValue}
          key={ball.ballValue}
          disabled={ball.disabled}
          alt={alt}
        />
      ))}

      <div
        className="flex items-center justify-center cursor-pointer mx-auto bg-green-500 w-20 h-20 rounded-full text-white"
        onClick={handleAlt}
      >
        Alt
      </div>
    </div>
  );
}

export default GameGrid;
