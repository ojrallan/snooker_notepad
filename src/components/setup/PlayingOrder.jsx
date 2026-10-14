import { useState } from "react";

function PlayingOrder({ players, onSetPlayingOrder }) {
  const [playerOrder, setPlayerOrder] = useState(players);
  const [defaultOrder] = useState(() => [...players]);

  //Fisher-Yates shuffle
  function shuffleArray(array) {
    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  }

  function shufflePlayers() {
    const newOrder = shuffleArray(playerOrder);
    setPlayerOrder(newOrder);
    onSetPlayingOrder(newOrder);
  }

  function restoreOrder() {
    const originalOrder = [...defaultOrder];

    setPlayerOrder(originalOrder);
    onSetPlayingOrder(originalOrder);
  }

  return (
    <>
      <ul className=" w-fit mx-auto">
        {playerOrder.map((player, index) => (
          <li
            className="text-lg mt-2 bg-pink-200 rounded-sm px-2 py-1"
            key={index}
          >
            {index + 1}. {player.charAt(0).toUpperCase() + player.slice(1)}
          </li>
        ))}
      </ul>
      <div className="flex flex-col items-center w-full">
        <button
          onClick={shufflePlayers}
          className="mt-10 bg-blue-500 px-2 py-1 round-sm  w-32 text-white"
        >
          Shuffle Players
        </button>
        <button
          disabled={
            playerOrder.length === defaultOrder.length &&
            playerOrder.every((value, index) => value === defaultOrder[index])
          }
          onClick={restoreOrder}
          className={`${
            playerOrder.length === defaultOrder.length &&
            playerOrder.every((value, index) => value === defaultOrder[index])
              ? "bg-green-200"
              : "bg-green-500"
          } mt-5 px-2 py-1 round-sm  w-32 text-white`}
        >
          Default Order
        </button>
      </div>
    </>
  );
}

export default PlayingOrder


