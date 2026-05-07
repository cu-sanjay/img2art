import { useState, useRef, useCallback } from 'react'

type ArtType = 'ascii' | 'dots' | 'blocks' | 'braille' | 'lines'

const ART_TYPES: { id: ArtType; label: string; desc: string }[] = [
  { id: 'ascii',   label: 'ASCII',   desc: '$@#%*+=-.' },
  { id: 'dots',    label: 'DOTS',    desc: '·•●◦○' },
  { id: 'blocks',  label: 'BLOCKS',  desc: '░▒▓█' },
  { id: 'braille', label: 'BRAILLE', desc: '⠀⡀⣀⣤⣿' },
  { id: 'lines',   label: 'LINES',   desc: '─│┼╋━' },
]

export default function ImageArt() {
  const [image, setImage] = useState<string | null>(null)
  const [textArt, setTextArt] = useState('')
  const [svgData, setSvgData] = useState('')
  const [processing, setProcessing] = useState(false)
  const [artType, setArtType] = useState<ArtType>('ascii')
  const [intensity, setIntensity] = useState(50)
  const [width, setWidth] = useState(80)
  const [invert, setInvert] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('File must be under 10MB')
      return
    }
    setError(null)
    const reader = new FileReader()
    reader.onload = (e) => {
      setImage(e.target?.result as string)
      setTextArt('')
      setSvgData('')
    }
    reader.readAsDataURL(file)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }, [handleFile])

  const processImage = async () => {
    if (!image) return
    setProcessing(true)
    setTextArt('')
    setSvgData('')
    setError(null)
    try {
      const res = await fetch('/api/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: image.split(',')[1],
          type: artType,
          intensity,
          width,
          invert,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Conversion failed')
      if (data.textArt) setTextArt(data.textArt)
      if (data.svg) setSvgData(data.svg)
    } catch (err: any) {
      setError(err.message || 'Conversion failed')
    }
    setProcessing(false)
  }

  const copy = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 1500)
  }

  const download = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* ─── UPLOAD ─────────────────────────────────────── */}
      <section>
        <div className="n-label" style={{ marginBottom: 10 }}>
          ▸ INPUT — UPLOAD IMAGE
        </div>
        <div
          className={`n-dropzone${image ? ' has-image' : ''}${dragging ? ' dragging' : ''}`}
          onClick={() => !image && fileInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
        >
          {image ? (
            <div style={{ position: 'relative', width: '100%' }}>
              <img
                src={image}
                alt="Preview"
                style={{ width: '100%', maxHeight: 260, objectFit: 'contain', display: 'block', background: '#000' }}
              />
              <div style={{
                position: 'absolute',
                top: 8,
                right: 8,
                display: 'flex',
                gap: 6,
              }}>
                <button
                  className="n-btn"
                  style={{ padding: '6px 12px', fontSize: 10 }}
                  onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click() }}
                >
                  CHANGE
                </button>
                <button
                  className="n-btn"
                  style={{ padding: '6px 12px', fontSize: 10, borderColor: 'var(--n-red)', color: 'var(--n-red)' }}
                  onClick={(e) => {
                    e.stopPropagation()
                    setImage(null)
                    setTextArt('')
                    setSvgData('')
                    if (fileInputRef.current) fileInputRef.current.value = ''
                  }}
                >
                  CLEAR
                </button>
              </div>
            </div>
          ) : (
            <>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 28, color: 'var(--n-dim)', lineHeight: 1 }}>
                ⬡
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--n-gray)', letterSpacing: '0.1em' }}>
                DRAG & DROP OR CLICK TO UPLOAD
              </div>
              <div className="n-label" style={{ color: 'var(--n-dim)' }}>
                PNG · JPG · WEBP · GIF · BMP — MAX 10MB
              </div>
            </>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
          style={{ display: 'none' }}
        />
        {error && (
          <div style={{ marginTop: 8, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--n-red)', letterSpacing: '0.05em' }}>
            ⚠ {error}
          </div>
        )}
      </section>

      {/* ─── OPTIONS ─────────────────────────────────────── */}
      <section className="n-card" style={{ padding: 20 }}>
        <div className="n-label" style={{ marginBottom: 16 }}>▸ OPTIONS</div>

        {/* Art Type */}
        <div style={{ marginBottom: 18 }}>
          <div className="n-label" style={{ marginBottom: 10, color: 'var(--n-gray)' }}>ART TYPE</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {ART_TYPES.map(t => (
              <button
                key={t.id}
                className={`n-pill${artType === t.id ? ' active' : ''}`}
                onClick={() => setArtType(t.id)}
                title={t.desc}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sliders row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 18 }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span className="n-label" style={{ color: 'var(--n-gray)' }}>WIDTH</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--n-lime)', fontWeight: 700 }}>{width}</span>
            </div>
            <input
              type="range" min={40} max={160} value={width}
              onChange={e => setWidth(parseInt(e.target.value))}
              className="n-slider"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
              <span className="n-label" style={{ color: 'var(--n-dim)' }}>40</span>
              <span className="n-label" style={{ color: 'var(--n-dim)' }}>160</span>
            </div>
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span className="n-label" style={{ color: 'var(--n-gray)' }}>INTENSITY</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--n-lime)', fontWeight: 700 }}>{intensity}</span>
            </div>
            <input
              type="range" min={10} max={100} value={intensity}
              onChange={e => setIntensity(parseInt(e.target.value))}
              className="n-slider"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
              <span className="n-label" style={{ color: 'var(--n-dim)' }}>10</span>
              <span className="n-label" style={{ color: 'var(--n-dim)' }}>100</span>
            </div>
          </div>
        </div>

        {/* Invert + Convert */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <label className="n-toggle">
            <input
              type="checkbox"
              checked={invert}
              onChange={e => setInvert(e.target.checked)}
            />
            <span className="n-toggle-track">
              <span className="n-toggle-thumb" />
            </span>
            <span className="n-label" style={{ color: invert ? 'var(--n-lime)' : 'var(--n-gray)' }}>
              INVERT {invert ? '[ ON ]' : '[ OFF ]'}
            </span>
          </label>

          <button
            className="n-btn n-btn-primary"
            onClick={processImage}
            disabled={!image || processing}
            style={{ minWidth: 140 }}
          >
            {processing ? (
              <span>PROCESSING<span className="blink">_</span></span>
            ) : '▶ CONVERT →'}
          </button>
        </div>
      </section>

      {/* ─── TEXT OUTPUT ─────────────────────────────────── */}
      {textArt && (
        <section>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div className="n-label">▸ OUTPUT — TEXT ART</div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button
                className="n-btn"
                style={{ padding: '6px 14px', fontSize: 10, ...(copied === 'text' ? { borderColor: 'var(--n-lime)', color: 'var(--n-lime)' } : {}) }}
                onClick={() => copy(textArt, 'text')}
              >
                {copied === 'text' ? '✓ COPIED' : 'COPY'}
              </button>
              <button
                className="n-btn"
                style={{ padding: '6px 14px', fontSize: 10 }}
                onClick={() => download(textArt, 'artxt.txt', 'text/plain')}
              >
                ↓ TXT
              </button>
            </div>
          </div>
          <div className="n-output" style={{ maxHeight: 400, fontSize: 10, lineHeight: 1.05 }}>
            {textArt}
          </div>
        </section>
      )}

      {/* ─── SVG OUTPUT ──────────────────────────────────── */}
      {svgData && (
        <section>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div className="n-label">▸ OUTPUT — VECTOR SVG</div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button
                className="n-btn"
                style={{ padding: '6px 14px', fontSize: 10, ...(copied === 'svg' ? { borderColor: 'var(--n-lime)', color: 'var(--n-lime)' } : {}) }}
                onClick={() => copy(svgData, 'svg')}
              >
                {copied === 'svg' ? '✓ COPIED' : 'COPY SVG'}
              </button>
              <button
                className="n-btn"
                style={{ padding: '6px 14px', fontSize: 10 }}
                onClick={() => download(svgData, 'artxt.svg', 'image/svg+xml')}
              >
                ↓ SVG
              </button>
            </div>
          </div>
          <div style={{
            background: '#fff',
            border: '1px solid var(--n-border)',
            padding: 20,
            textAlign: 'center',
            overflow: 'auto',
          }}>
            <div dangerouslySetInnerHTML={{ __html: svgData }} style={{ display: 'inline-block' }} />
          </div>
        </section>
      )}

      {/* Empty state */}
      {!textArt && !svgData && !processing && (
        <div style={{
          textAlign: 'center',
          padding: '40px 20px',
          border: '1px dashed var(--n-border)',
          background: 'var(--n-dark)',
        }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--n-dim)', lineHeight: 2 }}>
            <div>UPLOAD AN IMAGE AND CLICK CONVERT</div>
            <div style={{ color: 'var(--n-border2)', marginTop: 8 }}>
              ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░<br/>
              ░░ .:-=+*#%@   ░▒▓█   ⠀⡀⣤⣿ ░░<br/>
              ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
