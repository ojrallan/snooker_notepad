import { useState } from "react";

function PlayingOrder({ players, onSetPlayingOrder }) {
  const [playerOrder, setPlayerOrder] = useState(players);
  const [defaultOrder] = useState(() => [...players]);

  // Fisher-Yates shuffle
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
      <ul className="mx-auto mt-5 w-full max-w-xs space-y-2">
        {playerOrder.map((player, index) => (
          <li
            className="flex items-center gap-3 rounded-lg border border-[#293646] bg-[#151E29] px-4 py-3 text-[#F4F5F6]"
            key={index}
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#D6A84B]/20 text-sm font-bold text-[#D6A84B]">
              {index + 1}
            </span>

            <span className="font-medium">
              {player.charAt(0).toUpperCase() + player.slice(1)}
            </span>
          </li>
        ))}
      </ul>

      <div className="flex w-full flex-col items-center">
        <button
          onClick={shufflePlayers}
          className="mt-8 w-40 rounded-lg bg-[#1D2937] px-3 py-2 font-semibold text-[#F4F5F6] border border-[#293646] transition hover:bg-[#293646]"
        >
          Shuffle Players
        </button>

        <button
          disabled={
            playerOrder.length === defaultOrder.length &&
            playerOrder.every((value, index) => value === defaultOrder[index])
          }
          onClick={restoreOrder}
          className={`mt-4 w-40 rounded-lg px-3 py-2 font-semibold transition ${
            playerOrder.length === defaultOrder.length &&
            playerOrder.every((value, index) => value === defaultOrder[index])
              ? "bg-[#1D2937] text-[#929EAC] cursor-not-allowed"
              : "bg-[#075C43] text-white hover:bg-[#087451]"
          }`}
        >
          Default Order
        </button>
      </div>
    </>
  );
}

export default PlayingOrder;
