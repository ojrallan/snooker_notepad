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
    console.log("Alt: ", alt);

    console.log(number);

    onAddScore(number);

    setBalls((balls) =>
      balls.map((ball) =>
        ball.ballValue === number ? { ...ball, disabled: true } : ball,
      ),
    );
  }

  function handlePenalty() {
    onAddScore(-1);
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
  }
  return (
    <>
      <div className="grid grid-cols-3 gap-2 mx-auto w-[90%] mt-6 shadow-md px-2 py-2">
        {balls.map((ball) => (
          <SnookerBall
            onDisableBall={handleDisableBall}
            number={ball.ballValue}
            key={ball.ballValue}
            disabled={ball.disabled}
            alt={alt}
          />
        ))}
      </div>
      <div className=" w-[80%] flex mx-auto mt-2 border-2 py-2 rounded-md shadow-md">
        <div
          className="flex items-center justify-center cursor-pointer mx-auto bg-green-500 w-20 h-20 rounded-full text-white"
          onClick={handleAlt}
        >
          Alt
        </div>
        <div
          className="flex items-center justify-center cursor-pointer mx-auto bg-pink-500 w-20 h-20 rounded-full text-white font-bold text-3xl"
          onClick={handlePenalty}
        >
          -1
        </div>
      </div>
    </>
  );
}

export default GameGrid;
