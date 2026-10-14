function PlayerTag({ name, onDeletePlayer }) {
  const displayName = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <div className="flex gap-2 px-2 py-1 bg-green-100 w-fit h-fit rounded-sm">
      <span>{displayName}</span>

      <button
        type="button"
        onClick={() => onDeletePlayer(name)}
        aria-label={`Remove ${displayName}`}
      >
        ❌
      </button>
    </div>
  );
}

export default PlayerTag;
