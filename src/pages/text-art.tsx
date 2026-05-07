import { useState, useEffect, useRef } from 'react'

const FONTS = [
  { id: 'Big',      label: 'BIG',      preview: 'Bold block letters' },
  { id: 'Standard', label: 'STANDARD', preview: 'Classic ASCII' },
  { id: 'Banner',   label: 'BANNER',   preview: 'Wide banner style' },
  { id: 'Block',    label: 'BLOCK',    preview: 'Filled block style' },
  { id: 'Doom',     label: 'DOOM',     preview: 'Classic Doom font' },
  { id: 'Shadow',   label: 'SHADOW',   preview: 'With drop shadow' },
  { id: 'Slant',    label: 'SLANT',    preview: 'Italic slanted' },
  { id: 'Ghost',    label: 'GHOST',    preview: 'Hollow outline' },
  { id: 'Larry 3D', label: '3D',       preview: '3D depth effect' },
  { id: 'Graffiti', label: 'GRAFFITI', preview: 'Street tag style' },
]

export default function TextArt() {
  const [text, setText] = useState('')
  const [font, setFont] = useState('Big')
  const [art, setArt] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const generate = async (inputText: string, inputFont: string) => {
    if (!inputText.trim()) {
      setArt('')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/text-art', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText, font: inputFont }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Generation failed')
      setArt(data.art || '')
    } catch (err: any) {
      setError(err.message)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => generate(text, font), 500)
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
  }, [text, font])

  const copy = async () => {
    if (!art) return
    await navigator.clipboard.writeText(art)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const download = () => {
    if (!art) return
    const blob = new Blob([art], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `artxt-${text.replace(/\s+/g, '-').toLowerCase()}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* ─── INPUT ──────────────────────────────────────── */}
      <section>
        <div className="n-label" style={{ marginBottom: 10 }}>▸ INPUT — TYPE YOUR NAME OR TEXT</div>
        <input
          className="n-input"
          type="text"
          placeholder="e.g. HELLO or your name..."
          value={text}
          onChange={e => setText(e.target.value)}
          maxLength={24}
          style={{ fontSize: 16, padding: '14px 16px' }}
          autoFocus
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
          <span className="n-label" style={{ color: 'var(--n-dim)' }}>
            MAX 24 CHARS FOR BEST RESULTS
          </span>
          <span className="n-label" style={{ color: text.length > 20 ? 'var(--n-red)' : 'var(--n-dim)' }}>
            {text.length}/24
          </span>
        </div>
      </section>

      {/* ─── FONT SELECTOR ──────────────────────────────── */}
      <section className="n-card" style={{ padding: 20 }}>
        <div className="n-label" style={{ marginBottom: 12 }}>▸ FONT STYLE</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {FONTS.map(f => (
            <button
              key={f.id}
              className={`n-pill${font === f.id ? ' active' : ''}`}
              onClick={() => setFont(f.id)}
              title={f.preview}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      {/* ─── EXAMPLES ───────────────────────────────────── */}
      {!text && (
        <section className="n-card" style={{ padding: 20 }}>
          <div className="n-label" style={{ marginBottom: 12 }}>▸ QUICK EXAMPLES — CLICK TO TRY</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['HELLO', 'YOUR NAME', 'LOVE', 'CODE', '2025', 'WOW', 'LOL', 'ART'].map(ex => (
              <button
                key={ex}
                className="n-btn"
                style={{ padding: '6px 14px', fontSize: 10 }}
                onClick={() => setText(ex)}
              >
                {ex}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* ─── OUTPUT ─────────────────────────────────────── */}
      <section>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <div className="n-label">
            ▸ OUTPUT
            {loading && (
              <span style={{ marginLeft: 8, color: 'var(--n-lime)' }}>
                GENERATING<span className="blink">_</span>
              </span>
            )}
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button
              className="n-btn"
              disabled={!art}
              style={{
                padding: '6px 14px',
                fontSize: 10,
                ...(copied ? { borderColor: 'var(--n-lime)', color: 'var(--n-lime)' } : {}),
              }}
              onClick={copy}
            >
              {copied ? '✓ COPIED' : 'COPY'}
            </button>
            <button
              className="n-btn"
              disabled={!art}
              style={{ padding: '6px 14px', fontSize: 10 }}
              onClick={download}
            >
              ↓ TXT
            </button>
          </div>
        </div>

        {error && (
          <div style={{ padding: 12, background: 'rgba(255,68,68,0.08)', border: '1px solid var(--n-red)', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--n-red)', marginBottom: 12 }}>
            ⚠ {error}
          </div>
        )}

        <div
          className="n-output"
          style={{
            minHeight: 180,
            fontSize: art.length > 500 ? 9 : 11,
            lineHeight: 1.15,
            overflowX: 'auto',
          }}
        >
          {art || (
            <span style={{ color: 'var(--n-dim)' }}>
              {text ? (
                <span>GENERATING<span className="blink">_</span></span>
              ) : (
                <span>
{`  _____
 |  __ \\
 | |  | |_   _ _ __ ___
 | |  | | | | | '__/ __|
 | |__| | |_| | | | (__
 |_____/ \\__,_|_|  \\___|

 Type something above...`}
                </span>
              )}
            </span>
          )}
        </div>
      </section>

      {/* ─── TIPS ───────────────────────────────────────── */}
      <section className="n-card" style={{ padding: 16 }}>
        <div className="n-label" style={{ marginBottom: 10 }}>▸ TIPS</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--n-gray)', lineHeight: 2, letterSpacing: '0.03em' }}>
          <div>→ ALL CAPS look best for most fonts</div>
          <div>→ Shorter text (1–8 chars) produces the cleanest output</div>
          <div>→ Use a monospace font to paste art in chat or code</div>
          <div>→ BIG and DOOM fonts work great for names</div>
          <div>→ SHADOW and 3D fonts look cool in terminals</div>
        </div>
      </section>
    </div>
  )
}
