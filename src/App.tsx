import { useState } from 'react'
import ImageArt from './pages/image-art'
import TextArt from './pages/text-art'
import Gallery from './pages/gallery'

type Tab = 'image' | 'text' | 'gallery'

export default function App() {
  const [tab, setTab] = useState<Tab>('image')

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* ─── HEADER ─────────────────────────────────────────── */}
      <header style={{
        background: 'var(--n-dark)',
        borderBottom: '1px solid var(--n-border)',
        padding: '0 24px',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          {/* Top bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 0 12px',
            borderBottom: '1px solid var(--n-border)',
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 22,
                fontWeight: 700,
                color: 'var(--n-lime)',
                letterSpacing: '-0.02em',
              }}>ARTXT</span>
              <span className="n-label" style={{ color: 'var(--n-dim)' }}>.SYS</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span className="n-label" style={{ color: 'var(--n-dim)' }}>v2.0.0</span>
              <span className="n-tag" style={{ color: 'var(--n-lime)', borderColor: 'var(--n-lime)' }}>READY</span>
            </div>
          </div>

          {/* Subtitle */}
          <div style={{ padding: '10px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span className="n-label" style={{ color: 'var(--n-gray)' }}>
              Image + Text → ASCII · Dots · Blocks · Braille · SVG
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--n-dim)', letterSpacing: '0.1em' }}>
              DARK UI
            </span>
          </div>

          {/* Tab Navigation */}
          <nav style={{ display: 'flex', gap: 0, marginTop: 0 }}>
            {([
              { key: 'image',   label: '01 · IMAGE',   desc: 'Upload → Art' },
              { key: 'text',    label: '02 · TEXT',    desc: 'Name → Art' },
              { key: 'gallery', label: '03 · GALLERY', desc: 'Ready Made' },
            ] as { key: Tab; label: string; desc: string }[]).map(t => (
              <button
                key={t.key}
                className={`n-tab${tab === t.key ? ' active' : ''}`}
                onClick={() => setTab(t.key)}
                style={{ paddingLeft: t.key === 'image' ? 0 : undefined }}
              >
                {t.label}
                <span style={{
                  display: 'block',
                  fontSize: 8,
                  letterSpacing: '0.08em',
                  color: tab === t.key ? 'var(--n-lime-dim)' : 'var(--n-dim)',
                  marginTop: 2,
                }}>
                  {t.desc}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* ─── MAIN CONTENT ───────────────────────────────────── */}
      <main style={{ flex: 1, padding: '32px 24px 48px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          {tab === 'image'   && <ImageArt />}
          {tab === 'text'    && <TextArt />}
          {tab === 'gallery' && <Gallery />}
        </div>
      </main>

      {/* ─── FOOTER ─────────────────────────────────────────── */}
      <footer style={{
        borderTop: '1px solid var(--n-border)',
        padding: '12px 24px',
        background: 'var(--n-dark)',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="n-label" style={{ color: 'var(--n-dim)' }}>
            ARTXT.SYS — DARK UI DESIGN
          </span>
          <span className="n-label" style={{ color: 'var(--n-dim)' }}>
            ASCII · DOTS · BLOCKS · BRAILLE · SVG
          </span>
        </div>
      </footer>
    </div>
  )
}
