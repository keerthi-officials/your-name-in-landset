import Image from "next/image";

export function letterCard({letter, variantIndex}: {
    letter: string,
    variantIndex: number,
}) {
    return (
        <div className="relative group cursor-pointer">
            <Image src={`https://science.nasa.gov/specials/your-name-in-landsat/images/${letter}_${variantIndex}.jpg`} alt={`${letter}_${variantIndex}`} />
            <div className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 p-2 text-white text-xs">
            <p>location</p>
            <p>lat and lng</p>
            </div>
        </div>
    )
}