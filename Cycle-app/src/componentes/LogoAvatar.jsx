export default function LogoAvatar({
  src,
  alt = "Logo",
  fallback = "C",
  sizeClass = "h-10 w-10 sm:h-11 sm:w-11",
}) {
  return (
    <div
      className={`${sizeClass} flex items-center justify-center overflow-hidden rounded-full bg-gray-100 `}
      aria-label={alt}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          loading="lazy"
          onError={(e) => {
            // Si la imagen falla, ocultamos el <img> y dejamos el fallback
            e.currentTarget.style.display = "none";
          }}
        />
      ) : (
        <span className="text-base sm:text-lg font-bold">{fallback}</span>
      )}
    </div>
  );
}