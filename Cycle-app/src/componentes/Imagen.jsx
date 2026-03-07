export default function Imagen({
    src,
    alt = "Ilustración",
    heightClass = "h-[30svh] sm:h-[30svh]",
}) {
    
    return (
        <div
            className={`
        ${heightClass}
        w-full
        flex items-center justify-center
        overflow-hidden
        rounded-b-[48px]
      `}
        >
            <img
                src={src}
                alt={alt}
                className="h-full w-auto object-contain"
                loading="lazy"
            />
        </div>
    );
}