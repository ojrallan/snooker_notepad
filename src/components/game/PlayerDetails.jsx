function PlayerDetails({ player }) {
  return (
   
<div className="mx-auto flex w-[80%] justify-center rounded-sm bg-blue-100 py-2">
  <div className="text-center">
    <p className="text-lg leading-tight">{player?.name}</p>
    <p className="text-4xl font-semibold leading-tight">
      {player?.scores.reduce((sum, num) => sum + num, 0)}
    </p>
  </div>
</div>

  );
}

export default PlayerDetails