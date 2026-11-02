import PlayerTag from "./PlayerTag";

function PlayerDisplay({ players, onDeletePlayer }) {
  return (
    <div className="flex min-h-[100px] w-full flex-wrap gap-2 rounded-xl border border-[#293646] bg-[#151E29] p-3">
      {players.map((player) => (
        <PlayerTag key={player} name={player} onDeletePlayer={onDeletePlayer} />
      ))}
    </div>
  );
}

export default PlayerDisplay;
