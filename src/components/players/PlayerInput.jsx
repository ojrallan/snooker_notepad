import { useState } from "react";
import toast from "react-hot-toast";

function PlayerInput({ onAddPlayer }) {
  const [playerName, setPlayerName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const name = playerName.trim().split(" ")[0].toLowerCase();

    if (!name || name.length < 3) {
      // alert("Please enter a valid name");
      toast.error("Please enter a valid name")
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
        className="min-w-0 flex-1 rounded-lg border border-[#293646] bg-[#151E29] px-3 py-2 text-[#F4F5F6] placeholder:text-[#929EAC] outline-none focus:border-[#D6A84B]"
        onChange={(e) => setPlayerName(e.target.value)}
        value={playerName}
      />

      <button className="rounded-lg bg-[#D6A84B] px-4 py-2 font-semibold text-[#0B1018] transition hover:bg-[#E5BC68]">
        Add
      </button>
    </form>
  );
}

export default PlayerInput;
