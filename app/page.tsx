"use client"
import { LetterCard } from "@/components/letter-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { letterData } from "@/data/letters";
import { useRef, useState } from "react";

export default function Home() {
  const [name, setName] = useState("")
  const [submittedName, setSubmittedName] = useState("keerthi")
  const [variantIndices, setVariantIndices] = useState<Record<number, number>>({})
  const [hoveredVariant, setHoveredVariant] = useState<{ location: string; lat: string; lng: string } | null>(null)
  const displayRef = useRef<HTMLDivElement>(null)

  const letters = submittedName.toUpperCase().replace(/[^A-Z]/g, '').split('').filter(Boolean)
  const gapClass = letters.length > 20 ? "gap-[0.2%]" : letters.length > 10 ? "gap-[0.5%]" : "gap-[1%]"

  const getVariant = (posIndex: number, letter: string) => {
    const customIndex = variantIndices[posIndex] ?? 0
    const variants = letterData[letter.toLowerCase()]
    return { variantIndex: customIndex % variants.length, variant: variants[customIndex % variants.length] }
  }

  const cycleVariant = (posIndex: number, letter: string) => {
    const max = letterData[letter.toLowerCase()].length
    setVariantIndices(prev => ({ ...prev, [posIndex]: ((prev[posIndex] ?? 0) + 1) % max }))
  }

  const handleSubmit = () => {
    setSubmittedName(name)
    setVariantIndices({})
  }

  const handleDownload = async () => {
    if (!letters.length) return
    const gap = 8
    const width = 200
    const height = Math.round(width * 19 / 8)

    const canvas = document.createElement('canvas')
    canvas.width = letters.length * width + (letters.length - 1) * gap
    canvas.height = height
    const ctx = canvas.getContext('2d')!

    await Promise.all(letters.map((letter, i) => {
      return new Promise<void>((resolve) => {
        const { variantIndex } = getVariant(i, letter)
        const img = new window.Image()
        img.crossOrigin = 'anonymous'
        img.onload = () => {
          ctx.drawImage(img, i * (width + gap), 0, width, height)
          resolve()
        }
        img.onerror = () => resolve()
        img.src = `https://science.nasa.gov/specials/your-name-in-landsat/images/${letter.toLowerCase()}_${variantIndex}.jpg`
      })
    }))

    const link = document.createElement('a')
    link.download = `${submittedName}-in-landsat.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <div className="flex-1 flex items-center px-4 justify-center">
        {letters.length === 0 ? (
          <p className="text-white/40 text-lg tracking-widest text-center">
            Type in your name to see it spelled out in Landsat imagery of Earth!
          </p>
        ) : (
            <div ref={displayRef} className={`flex flex-nowrap justify-center items-stretch ${gapClass} w-[90%] max-w-[90%] select-none`}>
              {letters.map((letter, i) => {
              const { variantIndex, variant } = getVariant(i, letter)
              return (
                <LetterCard
                  key={i}
                  letters={letters}
                  letter={letter.toLowerCase()}
                  variantIndex={variantIndex}
                  onClick={() => cycleVariant(i, letter)}
                  onHover={() => setHoveredVariant(variant)}
                  onLeave={() => setHoveredVariant(null)}
                />
              )
            })}
          </div>
        )}
      </div>

      <div className="text-center pb-2 h-10">
        {hoveredVariant && (
          <>
            <p className="text-white text-sm font-semibold">{hoveredVariant.location}C</p>
            <p className="text-white/60 text-xs">{hoveredVariant.lat} {hoveredVariant.lng}</p>
          </>
        )}
      </div>

      <div className="relative z-10 flex justify-center pb-8 ">
        <div className="flex items-center gap-2 bg-white backdrop-blur-3xl shadow-xl border rounded-full px-4 py-2">
          <Input type="text" maxLength={50} value={name} className="border shadow-md backdrop-blur-3xl"
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          />
          <Button onClick={handleSubmit} disabled={name === ""} variant="outline">Enter</Button>
          <Button onClick={handleDownload} disabled={!letters.length} variant="outline">↓ Save</Button>
        </div>
      </div>
    </div>
  );
}
