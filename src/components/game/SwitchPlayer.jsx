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
    <div className="mx-auto flex w-[90%] justify-between px-2 py-1 shadow-md">
      <button
        onClick={handlePreviousPlayer}
        className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium active:bg-gray-200"
      >
        Prev
      </button>

      <button
        onClick={handleNextPlayer}
        className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium active:bg-gray-200"
      >
        Next
      </button>
    </div>
  );
}

export default SwitchPlayer;
