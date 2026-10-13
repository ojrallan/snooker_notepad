import { useEffect, useState } from "react";

const initialBalls = [
  { ballValue: 1, disabled: false },
  { ballValue: 2, disabled: false },
  { ballValue: 3, disabled: false },
  { ballValue: 4, disabled: false },
  { ballValue: 5, disabled: false },
  { ballValue: 6, disabled: false },
  { ballValue: 7, disabled: false },
  { ballValue: 8, disabled: false },
  { ballValue: 9, disabled: false },
  { ballValue: 10, disabled: false },
  { ballValue: 11, disabled: false },
  { ballValue: 12, disabled: false },
  { ballValue: 13, disabled: false },
  { ballValue: 14, disabled: false },
  { ballValue: 15, disabled: false },
];

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
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col bg-white">
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

function PlayerDetails({ player }) {
  console.log("Player Details: ", player);
  return (
    <div className="w-[80%] flex justify-center mx-auto bg-blue-100 rounded-sm py-5">
      <div className="text-center">
        <p className="text-xl">{player?.name}</p>
        <p className="text-5xl font-semibold">
          {player?.scores.reduce((sum, num) => sum + num, 0)}
        </p>
      </div>
    </div>
  );
}

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
    <div className="w-[80%] flex justify-between mx-auto">
      <button onClick={handlePreviousPlayer}>Prev</button>
      <button onClick={handleNextPlayer}>Next</button>
    </div>
  );
}

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
          key={crypto.randomUUID()}
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

function SnookerBall({ balls, disabled, alt, number, onDisableBall }) {
  function handleClick() {
    if (alt) return;

    onDisableBall(number);
  }

  return (
    <input
      value={alt ? -number : number}
      disabled={disabled}
      readOnly
      onClick={handleClick}
      className={`h-20 w-20 bg-blue-500 ${disabled ? "bg-red-200/50" : "bg-blue-400"} text-center cursor-pointer text-3xl text-white rounded-full`}
    />
  );
}

function Header() {
  return (
    <header className="border-b border-gray-100 px-5 py-4">
      <h1 className="text-xl font-semibold text-gray-900">Snooker Ug</h1>
    </header>
  );
}

function PlayerDisplay({ players, onDeletePlayer }) {
  return (
    <div className="border h-fit min-h-[100px] flex flex-wrap gap-2  p-1 rounded-sm bg-blue-100/20">
      {players.map((player) => (
        <PlayerTag name={player} key={player} onDeletePlayer={onDeletePlayer} />
      ))}
    </div>
  );
}

function PlayerTag({ name, onDeletePlayer }) {
  return (
    <div className="w-fit flex gap-2 px-1 bg-green-100 h-fit py-1 border-green-300 rounded-sm border-1">
      <span>{name.charAt(0).toUpperCase() + name.slice(1)}</span>
      <button onClick={() => onDeletePlayer(name)}>❌</button>
    </div>
  );
}

function PlayerInput({ onAddPlayer }) {
  const [playerName, setPlayerName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const name = playerName.trim().split(" ")[0].toLowerCase();

    if (!name) {
      alert("Please enter a valid name");
      return;
    }
    onAddPlayer(name);
    console.log(playerName);
    setPlayerName("");
  }
  return (
    <form className="mt-10 flex justify-center gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter Player name"
        className="border py-1 px-1"
        onChange={(e) => setPlayerName(e.target.value)}
        value={playerName}
      />
      <button className="bg-green-500 text-white px-2 py-1 rounded-sm">
        Add
      </button>
    </form>
  );
}

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

export default App;
