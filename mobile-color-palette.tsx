'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { RefreshCw, Save, Trash2 } from "lucide-react"
import { motion } from "framer-motion"

export default function Component() {
  const [colors, setColors] = useState(['#FF5733', '#33FF57', '#3357FF', '#FF33F1', '#33FFF1'])
  const [savedPalettes, setSavedPalettes] = useState<string[][]>([])
  const [hue, setHue] = useState(0)
  const [saturation, setSaturation] = useState(100)
  const [lightness, setLightness] = useState(50)

  const generateRandomColor = () => {
    return `hsl(${Math.random() * 360}, ${saturation}%, ${lightness}%)`
  }

  const generatePalette = () => {
    const newColors = Array(5).fill(null).map(generateRandomColor)
    setColors(newColors)
  }

  const adjustColor = (index: number, adjustment: number) => {
    const newColors = [...colors]
    const color = newColors[index]
    const [h, s, l] = color.match(/\d+/g)!.map(Number)
    newColors[index] = `hsl(${(h + adjustment) % 360}, ${s}%, ${l}%)`
    setColors(newColors)
  }

  const savePalette = () => {
    setSavedPalettes([...savedPalettes, colors])
  }

  const applyPalette = (palette: string[]) => {
    setColors(palette)
  }

  const deletePalette = (index: number) => {
    const newPalettes = [...savedPalettes]
    newPalettes.splice(index, 1)
    setSavedPalettes(newPalettes)
  }

  useEffect(() => {
    generatePalette()
  }, [hue, saturation, lightness])

  return (
    <div className="min-h-screen bg-gray-100 p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-6">Generador de Paletas</h1>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Tono: {hue}</span>
          <Slider
            min={0}
            max={360}
            step={1}
            value={[hue]}
            onValueChange={(value) => setHue(value[0])}
            className="w-3/4"
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Saturación: {saturation}%</span>
          <Slider
            min={0}
            max={100}
            step={1}
            value={[saturation]}
            onValueChange={(value) => setSaturation(value[0])}
            className="w-3/4"
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Luminosidad: {lightness}%</span>
          <Slider
            min={0}
            max={100}
            step={1}
            value={[lightness]}
            onValueChange={(value) => setLightness(value[0])}
            className="w-3/4"
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {colors.map((color, index) => (
          <motion.div
            key={index}
            className="relative w-16 h-16 rounded-full overflow-hidden"
            whileTap={{ scale: 0.95 }}
          >
            <div
              className="w-full h-full"
              style={{ backgroundColor: color }}
            />
            <Input
              type="color"
              value={color}
              onChange={(e) => {
                const newColors = [...colors]
                newColors[index] = e.target.value
                setColors(newColors)
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-1 pb-1">
              <Button
                size="sm"
                variant="ghost"
                className="p-0 h-6 w-6 rounded-full bg-white/50"
                onClick={() => adjustColor(index, -10)}
              >
                -
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="p-0 h-6 w-6 rounded-full bg-white/50"
                onClick={() => adjustColor(index, 10)}
              >
                +
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center space-x-2">
        <Button onClick={generatePalette} className="flex items-center">
          <RefreshCw className="mr-2 h-4 w-4" /> Generar
        </Button>
        <Button onClick={savePalette} className="flex items-center">
          <Save className="mr-2 h-4 w-4" /> Guardar
        </Button>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Paletas Guardadas</h2>
        {savedPalettes.map((palette, paletteIndex) => (
          <div key={paletteIndex} className="flex items-center space-x-2">
            <div className="flex-grow flex space-x-1">
              {palette.map((color, colorIndex) => (
                <div
                  key={colorIndex}
                  className="w-8 h-8 rounded-full"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <Button onClick={() => applyPalette(palette)} size="sm">
              Aplicar
            </Button>
            <Button onClick={() => deletePalette(paletteIndex)} size="sm" variant="destructive">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Vista Previa</h2>
        <div className="space-y-4" style={{ backgroundColor: colors[0] }}>
          <div className="p-4 rounded-lg" style={{ backgroundColor: colors[1] }}>
            <h3 className="text-lg font-bold mb-2" style={{ color: colors[2] }}>Título de Ejemplo</h3>
            <p className="mb-2" style={{ color: colors[3] }}>Este es un párrafo de ejemplo para mostrar cómo se verían los colores en un diseño real.</p>
            <Button style={{ backgroundColor: colors[4], color: colors[0] }}>
              Botón de Ejemplo
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}