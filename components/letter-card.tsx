"use client"
import Image from "next/image";

export function LetterCard({ letter, letters, variantIndex, onClick, onHover, onLeave }: {
    letter: string,
    letters: string[],
    variantIndex: number,
    onClick: () => void
    onHover: () => void
    onLeave: () => void
}) {
    const letterSize = letters.length > 20 ? "text-xs px-0.5 py-0.5" : letters.length > 10 ? "text-sm px-2 py-1" : "text-xl px-3 py-1"
    return (
        <div className="relative group cursor-pointer flex-1 min-w-0 aspect-8/19 max-w-46 hover:scale-108 duration-400 transition-all"
            onClick={onClick} onMouseEnter={onHover} 
            onMouseLeave={onLeave}>
            <Image
                src={`https://science.nasa.gov/specials/your-name-in-landsat/images/${letter}_${variantIndex}.jpg`}
                alt={`${letter}_${variantIndex}`}
                fill
                className="object-cover rounded-sm"
            />
            <div className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-2">
                <p className={`${letterSize} text-white bg-black/80 rounded-md`}>{letter.toUpperCase()}</p>
            </div>
        </div>
    )
}