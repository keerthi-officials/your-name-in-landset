import { letterData } from "@/data/letters";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("")
  const [variantIndices, setVariantIndices] = useState<Record<number, number>>({})
  const letters = name.toUpperCase().replace(/[^A-Z]/g, '').split('')

  const getVariant = (posIndex: number, letter: string) => {
    const customIndex = variantIndices[posIndex] ?? 0
    const variants = letterData[letter.toLowerCase()]
return { variantIndex: customIndex % variants.length, variant: variants[customIndex % variants.length] }
  }

  const cycleVariant = (posIndex: number, letter: string) => {
    const max = letterData[letter.toLowerCase()].length
    setVariantIndices(prev => ({ ...prev, [posIndex]: ((prev[posIndex] ?? 0) + 1) % max}))
  }

  return (
     <div className="min-h-screen">
      <div className="flex flex-wrap gap-2 justify-center"></div>
     </div>
  );
}
