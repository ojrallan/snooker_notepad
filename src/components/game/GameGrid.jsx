import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";

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
        toast(`${player.name} has been eliminated`);
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
    toast.error("Penalty: -1 point")
  }

  function handleAlt() {
    setAlt((prev) => !prev);
  }

  return (
    <div className="mx-auto flex w-full flex-col gap-2">
      {/* Compact highest score */}
      <div className="flex items-center justify-center gap-2 text-xs">
        <span className="text-[#929EAC]">Highest score:</span>
        <span className="font-bold text-[#D6A84B]">{highestScore}</span>
      </div>

      {/* Snooker balls */}
      <div className="mx-auto grid w-[90%] grid-cols-3 justify-items-center gap-x-2 gap-y-2 rounded-xl border border-[#293646] bg-[#151E29] px-2 py-2">
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
      <div className="mx-auto flex w-[90%] items-center justify-around gap-3 rounded-xl border border-[#293646] bg-[#151E29] p-2">
        {/* Alt */}
        <button
          type="button"
          onClick={handleAlt}
          className={`flex h-12 flex-1 flex-col items-center justify-center rounded-lg border text-sm font-bold transition active:scale-95 ${
            alt
              ? "border-red-500 bg-red-600/20 text-red-400"
              : "border-[#293646] bg-[#1D2937] text-[#F4F5F6]"
          }`}
        >
          ALT
          <span className="text-[10px] font-medium">{alt ? "ON" : "OFF"}</span>
        </button>

        {/* Penalty */}
        <button
          type="button"
          onClick={handlePenalty}
          className="flex h-12 flex-1 items-center justify-center rounded-lg border border-[#8B344E] bg-[#8B344E]/20 text-xl font-bold text-[#FF8BA5] transition active:scale-95"
        >
          -1
        </button>
      </div>
    </div>
  );
}

export default GameGrid;
