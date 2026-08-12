import { useState } from "react";

function App() {
  const [playersList, setPlayersList] = useState([]);
  const [currentPage, setCurrentPage] = useState("players");

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
              <PlayingOrder players={playersList} />
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
            {/* <button className="text-sm font-medium text-black">Home</button> */}
          </div>
        </nav>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="border-b border-gray-100 px-5 py-4">
      <h1 className="text-xl font-semibold text-gray-900">Snooker Ug</h1>
    </header>
  );
}

function PlayingOrder({ players }) {
  const [playerOrder, setPlayerOrder] = useState(players);
  const defaultOrder = players;

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
    let players = playerOrder;
    let newOrder = shuffleArray(players);
    setPlayerOrder((prev) => newOrder);
  }

  function restoreOrder() {
    setPlayerOrder((prev) => defaultOrder);
  }

  return (
    <>
      <ul className=" w-fit mx-auto">
        {playerOrder.map((player, index) => (
          <li className="text-lg mt-2 bg-pink-200 rounded-sm px-2 py-1">
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

export default App;
