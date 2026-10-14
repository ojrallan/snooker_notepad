import { useState } from "react";

import GameGrid from "./components/game/GameGrid";
import PlayerDisplay from "./components/players/PlayerDisplay";
import PlayerDetails from "./components/game/PlayerDetails";
import SwitchPlayer from "./components/game/SwitchPlayer";
import PlayerInput from "./components/players/PlayerInput";
import PlayingOrder from "./components/setup/PlayingOrder";
import Header from "./components/Layout/Header";

function App() {
  const [playersList, setPlayersList] = useState([]);
  const [currentPage, setCurrentPage] = useState("players");
  const [playerObjects, setPlayerObjects] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(playerObjects[0] ?? null);

  function handleStartGame() {
    const gamePlayers = playersList.map((player) => ({
      name: player,
      scores: [],
    }));

    setPlayerObjects(gamePlayers);
    setCurrentPlayer(gamePlayers[0] ?? null);
    setCurrentPage("game");
  }

  function handleAddScore(ballValue) {
    if (!currentPlayer) return;

    const updatedPlayer = {
      ...currentPlayer,
      scores: [...currentPlayer.scores, ballValue],
    };

    setPlayerObjects((players) =>
      players.map((player) =>
        player.name === currentPlayer.name ? updatedPlayer : player,
      ),
    );

    setCurrentPlayer(updatedPlayer);
  }

  function handleSetCurrentPlayer(playerObject) {
    setCurrentPlayer(playerObject);
  }

  function handleAddPlayer(playerName) {
    if (playersList.includes(playerName)) {
      alert("Player already added");
      return;
    }
    setPlayersList((list) => [...list, playerName]);
    console.log(playersList);
  }

  function handleDeletePlayer(playerName) {
    setPlayersList((players) =>
      players.filter((player) => player !== playerName),
    );
    console.log(playersList);
  }

  function handlePlayingOrder(playingOrder) {
    console.log("Handle Playing Order called");
    console.log("Received Playing Order: ", playingOrder);
    setPlayersList(playingOrder);
    console.log("updated order: ", playersList);
  }

  return (
    <div className="min-h-screen bg-gray-100 w-full max-w-[430px]">
      <div className="mx-auto flex min-h-screen  flex-col bg-white">
        {/* Header */}
        <Header />
        {/* Content */}
        <main className="flex-1 px-5 py-6">
          {currentPage === "players" && (
            <>
              <PlayerDisplay
                players={playersList}
                onDeletePlayer={handleDeletePlayer}
              />

              <PlayerInput onAddPlayer={handleAddPlayer} />
            </>
          )}
          {currentPage === "order" && (
            <>
              <h3 className="font-semibold text-center text-lg">
                Playing Order 🎱
              </h3>
              <PlayingOrder
                players={playersList}
                onSetPlayingOrder={handlePlayingOrder}
              />
            </>
          )}
          {currentPage === "game" && (
            <>
              <PlayerDetails player={currentPlayer} />
              <GameGrid
                currentPlayer={currentPlayer}
                playerObjects={playerObjects}
                onAddScore={handleAddScore}
              />
              <SwitchPlayer
                currentPlayer={currentPlayer}
                playerObjects={playerObjects}
                onSetCurrentPlayer={handleSetCurrentPlayer}
              />
            </>
          )}
        </main>

        {/* Bottom navigation */}
        <nav className="border-t border-gray-100 bg-white px-5 py-3">
          <div className="flex items-center justify-around">
            {currentPage === "players" && (
              <button
                className="text-sm font-medium text-black"
                onClick={() => setCurrentPage("order")}
              >
                Next
              </button>
            )}

            {currentPage === "order" && (
              <button
                className="text-sm font-medium text-black"
                onClick={handleStartGame}
              >
                Start Game
              </button>
            )}
            {/* <button className="text-sm font-medium text-black">Home</button> */}
          </div>
        </nav>
      </div>
    </div>
  );
}

export default App;
