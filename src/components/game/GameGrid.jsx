import { useState, useEffect, useCallback } from "react";

import { initialBalls } from "../data/initialBalls";
import SnookerBall from "./SnookerBall";

function GameGrid({ currentPlayer, playerObjects, onAddScore }) {
  const [alt, setAlt] = useState(false);
  const [balls, setBalls] = useState(initialBalls);
  const [highestScore, setHighestScore] = useState(0);

  const checkPlayersStatus = useCallback(() => {
    const ballsLeft = balls.filter((ball) => !ball.disabled);

    const scoreLeft = ballsLeft.reduce((sum, ball) => sum + ball.ballValue, 0);

    let highest = 0;

    for (const player of playerObjects) {
      const playerScore = player.scores.reduce((sum, score) => sum + score, 0);

      if (playerScore > highest) {
        highest = playerScore;
      }
    }

    setHighestScore(highest);

    for (const player of playerObjects) {
      const playerScore = player.scores.reduce((sum, score) => sum + score, 0);

      if (playerScore + scoreLeft < highest) {
        alert(`${player.name} has been eliminated`);
      }
    }
  }, [balls, playerObjects]);

  useEffect(() => {
    checkPlayersStatus();
  }, [checkPlayersStatus]);

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

  function handleAlt() {
    setAlt((prev) => !prev);
  }
  return (
    <>
      {/* Highest score */}
      <div className="mx-auto mt-1 w-[90%] text-center font-semibold">
        Highest: {highestScore}
      </div>

      {/* Snooker balls */}
      <div className="mx-auto mt-3 grid w-[90%] grid-cols-3 gap-2 px-2 py-1 shadow-md justify-items-center bg-slate-800">
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

      {/* Action buttons */}
      <div className="mx-auto mt-2 flex w-[90%] items-center justify-around rounded-md border-2 py-2 shadow-md bg-slate-800">
        <div
          className="flex flex-col h-16 w-32 cursor-pointer items-center justify-center  bg-slate-500 text-white"
          onClick={handleAlt}
        >
          <div>
            {" "}
            <p> Alt</p>
          </div>
          <div>
            <p>{alt ? "[ON]" : "[OFF]"}</p>
          </div>
        </div>

        <div
          className="flex h-16 w-32 cursor-pointer items-center justify-center bg-red-500 text-2xl font-bold text-white"
          onClick={handlePenalty}
        >
          -1
          {/* <img
            src="/images/balls/minus.png"
            alt="cue_ball"
            className="object-contain max-h-12 max-w-12"
          /> */}
        </div>
      </div>
    </>
  );
}

export default GameGrid;
