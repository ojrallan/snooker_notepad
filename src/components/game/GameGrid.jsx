import { useState } from "react";

import { initialBalls } from "../data/initialBalls";
import SnookerBall from "./SnookerBall";

function GameGrid({ currentPlayer, onAddScore }) {
  const [alt, setAlt] = useState(false);
  const [balls, setBalls] = useState(initialBalls);

  function handleDisableBall(number) {
    onAddScore(number);

    setBalls((balls) =>
      balls.map((ball) =>
        ball.ballValue === number ? { ...ball, disabled: true } : ball,
      ),
    );
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
