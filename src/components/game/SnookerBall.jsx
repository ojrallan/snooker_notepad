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
    <input
      value={alt ? -number : number}
      disabled={disabled}
      readOnly
      onClick={handleClick}
      className={`h-20 w-20 bg-blue-500 ${disabled ? "bg-red-200/50" : "bg-blue-400"} text-center cursor-pointer text-3xl text-white rounded-full`}
    />
  );
}
