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
  type="button"
  value={alt ? -number : number}
  disabled={disabled}
  readOnly
  onClick={handleClick}
  className={`h-16 w-16 appearance-none rounded-full text-center text-2xl text-white cursor-pointer ${
    disabled ? "bg-red-200/50" : "bg-blue-400"
  }`}
/>

  );
}
