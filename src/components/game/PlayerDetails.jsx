function PlayerDetails({ player }) {
  return (
    <div className="mx-auto flex w-[80%] justify-center rounded-xl border border-[#293646] bg-[#151E29] py-3">
      <div className="text-center">
        <p className="text-lg font-semibold capitalize text-[#F4F5F6]">
          {player?.name}
        </p>

        <p className="text-4xl font-bold leading-tight text-[#D6A84B]">
          {player?.scores.reduce((sum, num) => sum + num, 0)}
        </p>

        <p className="mt-1 text-xs uppercase tracking-widest text-[#929EAC]">
          Current score
        </p>
      </div>
    </div>
  );
}

export default PlayerDetails;
