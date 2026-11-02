function PlayerTag({ name, onDeletePlayer }) {
  const displayName = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-800 border border-green-200 w-fit h-fit rounded-md">
      <span className="text-sm font-medium">{displayName}</span>

      <button
        type="button"
        onClick={() => onDeletePlayer(name)}
        aria-label={`Remove ${displayName}`}
        className="text-green-700 hover:text-red-600 transition-colors font-semibold"
      >
        ×
      </button>
    </div>
  );
}

export default PlayerTag;
