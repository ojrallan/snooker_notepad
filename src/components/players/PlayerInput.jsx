import { useState } from "react";

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

export default PlayerInput