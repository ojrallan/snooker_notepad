import PlayerTag from "./PlayerTag";

function PlayerDisplay({ players, onDeletePlayer }) {
  return (
    <div className="border min-h-[100px] w-full flex flex-wrap gap-2 p-1 rounded-sm bg-blue-100/20">
      {players.map((player) => (
        <PlayerTag key={player} name={player} onDeletePlayer={onDeletePlayer} />
      ))}
    </div>
  );
}

export default PlayerDisplay;
