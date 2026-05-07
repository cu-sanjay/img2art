import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Jimp } from 'jimp'

const ASCII_CHARS   = '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,"^`. '
const DOT_CHARS     = '●◉◎○◦·  . '
const BLOCK_CHARS   = '█▓▒░ '
const BRAILLE_CHARS = '⣿⣷⣶⣤⣀⠿⠶⠒⠂⠀'
const LINE_CHARS    = '╬╪╫╋┿━┼─ '

function getChars(type: string): string {
  switch (type) {
    case 'dots':    return DOT_CHARS
    case 'blocks':  return BLOCK_CHARS
    case 'braille': return BRAILLE_CHARS
    case 'lines':   return LINE_CHARS
    default:        return ASCII_CHARS
  }
}

function generateTextArt(data: Buffer, w: number, h: number, type: string, intensity: number, invert: boolean): string {
  const chars = getChars(type)
  const factor = intensity / 100
  let result = ''
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4
      const brightness = data[i]
      const adjusted = Math.pow(brightness / 255, factor) * 255
      let idx = Math.floor((adjusted / 255) * (chars.length - 1))
      if (invert) idx = chars.length - 1 - idx
      result += chars[idx] ?? ' '
    }
    result += '\n'
  }
  return result
}

function generateSVG(data: Buffer, w: number, h: number, intensity: number, invert: boolean): string {
  const cellSize = 4
  const factor = intensity / 100
  let svg = `<svg width="${w * cellSize}" height="${h * cellSize}" xmlns="http://www.w3.org/2000/svg">`
  svg += `<rect width="100%" height="100%" fill="${invert ? 'black' : 'white'}"/>`
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4
      const brightness = data[i]
      const adjusted = Math.pow(brightness / 255, factor) * 255
      const raw = adjusted / 255
      const opacity = invert ? raw : 1 - raw
      if (opacity > 0.05) {
        const fill = invert ? 'white' : 'black'
        svg += `<rect x="${x * cellSize}" y="${y * cellSize}" width="${cellSize}" height="${cellSize}" fill="${fill}" opacity="${opacity.toFixed(2)}"/>`
      }
    }
  }
  svg += '</svg>'
  return svg
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const { image, type = 'ascii', intensity = 50, width = 80, invert = false } = req.body || {}
    if (!image) return res.status(400).json({ error: 'Missing image data' })

    const targetWidth = Math.min(Math.max(parseInt(width) || 80, 20), 200)
    const targetHeight = Math.floor(targetWidth * 0.45)

    const img = await Jimp.fromBuffer(Buffer.from(image, 'base64'))
    img.resize({ w: targetWidth, h: targetHeight })
    img.greyscale()

    const { data, width: w, height: h } = img.bitmap
    const textArt = generateTextArt(data as Buffer, w, h, type, parseInt(intensity), !!invert)
    const svg = generateSVG(data as Buffer, w, h, parseInt(intensity), !!invert)

    res.status(200).json({ textArt, svg })
  } catch (err: any) {
    console.error('Convert error:', err?.message)
    res.status(500).json({ error: 'Conversion failed: ' + (err?.message || 'unknown') })
  }
}
