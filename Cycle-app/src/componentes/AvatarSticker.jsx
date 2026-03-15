export default function AvatarSticker({
  src,
  alt,
  selected = false,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={alt}
      aria-pressed={selected}
      className={`
        flex items-center justify-center rounded-full bg-white/95
        h-[62px] w-[62px] mx-auto
        ring-1 ring-pink-50
        shadow-[0_6px_20px_rgba(0,0,0,0.06)]
        transition
        hover:shadow-[0_12px_28px_rgba(251,113,133,0.20)] hover:ring-pink-300
        focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-300/60
        active:scale-[0.98]
        ${selected ? "ring-2 ring-rose-500" : ""}
      `}
    >
      <img
        src={src}
        alt={alt}
        className="h-[36px] w-[36px] object-contain"
        draggable={false}
      />
    </button>
  );
}
