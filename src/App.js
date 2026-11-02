import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

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

  useEffect(() => {
    for (let i = 1; i <= 15; i++) {
      const img = new Image();
      img.src = `/images/balls/ball_${i}.png`;
    }
  }, []);

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
      toast.error("Player already added");
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
    <div className="h-dvh w-full max-w-[430px] mx-auto overflow-hidden border-2 border-[#293646] bg-[#0B1018] flex flex-col">
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 1500,
          style: {
            background: "#dcfce7",
            color: "#151E29",
            border: "1px solid #293646",
            borderRadius: "12px",
          },
        }}
      />
      {/* Main app container */}
      <div className="flex flex-1 min-h-0 flex-col bg-[#0B1018]">
        {/* Header */}
        <Header />

        {/* Content */}
        <main className="flex-1 min-h-0 px-5 py-3 overflow-hidden bg-[#0B1018] text-[#F4F5F6]">
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
              <h3 className="text-center text-lg font-semibold text-[#F4F5F6]">
                Playing Order 🎱
              </h3>

              <PlayingOrder
                players={playersList}
                onSetPlayingOrder={handlePlayingOrder}
              />
            </>
          )}

          {currentPage === "game" && (
            <div className="flex h-full min-h-0 flex-col justify-between">
              {/* Top */}
              <PlayerDetails player={currentPlayer} />

              {/* Middle */}
              <GameGrid
                currentPlayer={currentPlayer}
                playerObjects={playerObjects}
                onAddScore={handleAddScore}
              />

              {/* Bottom */}
              <SwitchPlayer
                currentPlayer={currentPlayer}
                playerObjects={playerObjects}
                onSetCurrentPlayer={handleSetCurrentPlayer}
              />
            </div>
          )}
        </main>

        {/* Bottom navigation */}
        <nav className="shrink-0 border-t border-[#293646] bg-[#151E29] px-5 py-3">
          <div className="flex items-center justify-around">
            {currentPage === "players" && (
              <button
                className="rounded-lg bg-[#D6A84B] px-6 py-2 text-sm font-bold text-[#0B1018] transition hover:bg-[#E5BC68]"
                onClick={() => setCurrentPage("order")}
              >
                Next
              </button>
            )}

            {currentPage === "order" && (
              <button
                className="rounded-lg bg-[#D6A84B] px-6 py-2 text-sm font-bold text-[#0B1018] transition hover:bg-[#E5BC68]"
                onClick={handleStartGame}
              >
                Start Game
              </button>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}

export default App;
