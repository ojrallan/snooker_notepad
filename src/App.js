import { useState } from "react";

function App() {
  const [playersList, setPlayersList] = useState([]);

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
          <PlayerDisplay
            players={playersList}
            onDeletePlayer={handleDeletePlayer}
          />
          <PlayerInput onAddPlayer={handleAddPlayer} />
        </main>

        {/* Bottom navigation */}
        <nav className="border-t border-gray-100 bg-white px-5 py-3">
          <div className="flex items-center justify-around">
            {/* <button className="text-sm font-medium text-black">Home</button> */}

            <button className="text-sm font-medium text-black">Next</button>
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
