function SwitchPlayer({ playerObjects, currentPlayer, onSetCurrentPlayer }) {
  function handleNextPlayer() {
    if (playerObjects.length === 0) return;

    const currentIndex = playerObjects.findIndex(
      (player) => player.name === currentPlayer?.name,
    );

    const nextIndex =
      currentIndex === -1 ? 0 : (currentIndex + 1) % playerObjects.length;

    onSetCurrentPlayer(playerObjects[nextIndex]);
  }

  function handlePreviousPlayer() {
    if (playerObjects.length === 0) return;

    const currentIndex = playerObjects.findIndex(
      (player) => player.name === currentPlayer?.name,
    );

    const previousIndex =
      currentIndex === -1
        ? playerObjects.length - 1
        : (currentIndex - 1 + playerObjects.length) % playerObjects.length;

    onSetCurrentPlayer(playerObjects[previousIndex]);
  }

  return (
    <div className="mx-auto flex w-[90%] justify-between gap-3 rounded-xl border border-[#293646] bg-[#151E29] px-3 py-3">
      <button
        onClick={handlePreviousPlayer}
        className="flex-1 rounded-lg border border-[#293646] bg-[#1D2937] px-4 py-3 text-sm font-semibold text-[#F4F5F6] transition hover:bg-[#293646] active:scale-95"
      >
        ← Previous
      </button>

      <button
        onClick={handleNextPlayer}
        className="flex-1 rounded-lg bg-[#D6A84B] px-4 py-3 text-sm font-bold text-[#0B1018] transition hover:bg-[#E5BC68] active:scale-95"
      >
        Next →
      </button>
    </div>
  );
}

export default SwitchPlayer;
