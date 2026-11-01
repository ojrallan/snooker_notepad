export default function SnookerBall({
  balls,
  disabled,
  alt,
  number,
  onDisableBall,
}) {
  function handleClick() {
    if (disabled) alert("Ball already potted");

    alt ? onDisableBall(-number) : onDisableBall(number);
  }

  return (
    <div
      type="button"
      disabled={disabled}
      onClick={handleClick}
      className="h-16 w-16 relative cursor-pointer disabled:cursor-not-allowed "
    >
      <img
        src={`/images/balls/ball_${Math.abs(number)}.png`}
        alt={`Ball ${number}`}
        className={`h-full w-full object-contain ${disabled ? "opacity-40" : ""}`}
      />

      {/* Red overlay for Alt mode */}
      {alt && !disabled && (
        <span className="absolute inset-0 rounded-full bg-red-600/30 pointer-events-none" />
      )}
    </div>
    // <input
    //   type="button"
    //   value={alt ? -number : number}
    //   disabled={disabled}
    //   readOnly
    //   onClick={handleClick}
    //   className={`h-16 w-16 appearance-none rounded-full text-center text-2xl text-white cursor-pointer ${
    //     disabled ? "bg-red-200/50" : "bg-blue-400"
    //   }`}
    // />
  );
}
