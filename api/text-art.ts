import type { VercelRequest, VercelResponse } from '@vercel/node'
import figlet from 'figlet'
import { createRequire } from 'module'
import path from 'path'

const _require = createRequire(import.meta.url)
const figletMain = _require.resolve('figlet')
const figletFontsPath = path.join(path.dirname(figletMain), '..', 'fonts')
figlet.defaults({ fontPath: figletFontsPath })

const ALLOWED_FONTS: figlet.Fonts[] = [
  'Big', 'Standard', 'Banner', 'Block', 'Doom',
  'Shadow', 'Slant', 'Ghost', 'Larry 3D', 'Graffiti',
]

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { text, font = 'Big' } = req.body || {}
  if (!text || typeof text !== 'string') return res.status(400).json({ error: 'Missing text' })

  const safeFont: figlet.Fonts = ALLOWED_FONTS.includes(font as figlet.Fonts) ? font : 'Big'

  try {
    const art = await new Promise<string>((resolve, reject) => {
      figlet.text(text.slice(0, 30), { font: safeFont }, (err, result) => {
        if (err) reject(err)
        else resolve(result || '')
      })
    })
    res.status(200).json({ art })
  } catch (err: any) {
    console.error('Text art error:', err?.message)
    res.status(500).json({ error: 'Generation failed: ' + (err?.message || 'unknown') })
  }
}
