function PlayerDetails({ player }) {
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

export default PlayerDetails