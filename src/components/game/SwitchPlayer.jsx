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
    <div className="w-[90%] flex justify-between mx-auto shadow-md py-2 px-2">
      <button onClick={handlePreviousPlayer}>Prev</button>
      <button onClick={handleNextPlayer}>Next</button>
    </div>
  );
}

export default SwitchPlayer;
