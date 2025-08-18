import sharp from 'sharp'

const ASCII_CHARS = ' .:-=+*#%@'
const DOT_CHARS = ' .·•●'
const BLOCK_CHARS = ' ░▒▓█'
const LINE_CHARS = ' ╱╲╳'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { image, type, intensity, width } = req.body
    const imageBuffer = Buffer.from(image, 'base64')
    
    const height = Math.floor(width * 0.5)
    
    const { data, info } = await sharp(imageBuffer)
      .resize(width, height)
      .grayscale()
      .raw()
      .toBuffer({ resolveWithObject: true })

    let textArt = ''
    let svgData = ''

    if (type === 'ascii' || type === 'dots' || type === 'blocks' || type === 'lines') {
      textArt = generateTextArt(data, info.width, info.height, type, intensity)
    }

    svgData = generateSVG(data, info.width, info.height, intensity)

    res.status(200).json({ textArt, svg: svgData })
  } catch (error) {
    console.error('Conversion error:', error)
    res.status(500).json({ error: 'Conversion failed' })
  }
}

function generateTextArt(data, width, height, type, intensity) {
  let chars
  switch (type) {
    case 'dots': chars = DOT_CHARS; break
    case 'blocks': chars = BLOCK_CHARS; break
    case 'lines': chars = LINE_CHARS; break
    default: chars = ASCII_CHARS
  }

  let result = ''
  const factor = intensity / 100
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pixelIndex = (y * width + x)
      const brightness = data[pixelIndex]
      const adjustedBrightness = Math.pow(brightness / 255, factor) * 255
      const charIndex = Math.floor((adjustedBrightness / 255) * (chars.length - 1))
      result += chars[charIndex]
    }
    result += '\n'
  }
  
  return result
}

function generateSVG(data, width, height, intensity) {
  const cellSize = 4
  const svgWidth = width * cellSize
  const svgHeight = height * cellSize
  const factor = intensity / 100

  let svg = `<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">`
  svg += `<rect width="100%" height="100%" fill="white"/>`

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pixelIndex = (y * width + x)
      const brightness = data[pixelIndex]
      const adjustedBrightness = Math.pow(brightness / 255, factor) * 255
      const opacity = 1 - (adjustedBrightness / 255)
      
      if (opacity > 0.1) {
        const rectX = x * cellSize
        const rectY = y * cellSize
        svg += `<rect x="${rectX}" y="${rectY}" width="${cellSize}" height="${cellSize}" fill="black" opacity="${opacity.toFixed(2)}"/>`
      }
    }
  }

  svg += '</svg>'
  return svg
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
}