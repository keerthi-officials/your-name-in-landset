import Image from "next/image";

export function LetterCard({ letter, variantIndex, variant, onClick }: {
    letter: string,
    variantIndex: number,
    variant: { location: string; lat: string; lng: string }
    onClick: () => void
}) {
    return (
        <div className="relative group cursor-pointer" onClick={onClick}>
            <Image src={`https://science.nasa.gov/specials/your-name-in-landsat/images/${letter}_${variantIndex}.jpg`} height={200} width={200} className="object-cover" alt={`${letter}_${variantIndex}`} />
            <div className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 p-2 text-white text-xs">
                <p>{variant.location}</p>
                <p>{variant.lat} {variant.lng}</p>
            </div>
        </div>
    )
}