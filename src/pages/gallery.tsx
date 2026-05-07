import { useState } from 'react'
import { GALLERY_ITEMS, CATEGORIES, type GalleryCategory } from '@/data/gallery'

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory | 'all'>('all')
  const [search, setSearch] = useState('')
  const [copied, setCopied] = useState<string | null>(null)

  const filtered = GALLERY_ITEMS.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory
    const matchesSearch = !search || item.name.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const copy = async (art: string, id: string) => {
    await navigator.clipboard.writeText(art)
    setCopied(id)
    setTimeout(() => setCopied(null), 1500)
  }

  const CATEGORY_COLORS: Record<string, string> = {
    hands:   '#4488ff',
    animals: '#00cc88',
    symbols: '#ff8844',
    faces:   '#ff44aa',
    frames:  '#aaaaaa',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* ─── SEARCH + FILTERS ───────────────────────────── */}
      <section className="n-card" style={{ padding: 16 }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            className="n-input"
            type="text"
            placeholder="SEARCH ART..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: 1, minWidth: 160, fontSize: 11 }}
          />
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                className={`n-pill${activeCategory === cat.id ? ' active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COUNT ──────────────────────────────────────── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="n-label" style={{ color: 'var(--n-gray)' }}>
          ▸ {filtered.length} ART PIECES
        </span>
        <span className="n-label" style={{ color: 'var(--n-dim)' }}>
          CLICK COPY TO GRAB
        </span>
      </div>

      {/* ─── GRID ───────────────────────────────────────── */}
      {filtered.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 12,
        }}>
          {filtered.map(item => (
            <div key={item.id} className="gallery-card">
              {/* Category tag */}
              <div style={{ padding: '8px 10px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="n-tag" style={{
                  color: CATEGORY_COLORS[item.category] || 'var(--n-gray)',
                  borderColor: CATEGORY_COLORS[item.category] || 'var(--n-gray)',
                  opacity: 0.7,
                }}>
                  {item.category.toUpperCase()}
                </span>
              </div>

              {/* Art preview */}
              <div className="gallery-card-art" style={{ margin: '8px 0 0', fontSize: 10, lineHeight: 1.3 }}>
                {item.art}
              </div>

              {/* Footer */}
              <div style={{
                padding: '8px 10px',
                borderTop: '1px solid var(--n-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 8,
              }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  fontWeight: 700,
                  color: 'var(--n-white)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {item.name}
                </span>
                <button
                  className="n-btn"
                  style={{
                    padding: '5px 12px',
                    fontSize: 9,
                    flexShrink: 0,
                    ...(copied === item.id ? { borderColor: 'var(--n-lime)', color: 'var(--n-lime)' } : {}),
                  }}
                  onClick={() => copy(item.art, item.id)}
                >
                  {copied === item.id ? '✓' : 'COPY'}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '48px 24px',
          border: '1px dashed var(--n-border)',
          background: 'var(--n-dark)',
        }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--n-dim)', letterSpacing: '0.1em' }}>
            NO RESULTS FOUND
          </div>
        </div>
      )}

      {/* ─── SUBMIT SECTION ─────────────────────────────── */}
      <section className="n-card" style={{ padding: 20, marginTop: 8 }}>
        <div className="n-label" style={{ marginBottom: 10 }}>▸ USE YOUR ART</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--n-gray)', lineHeight: 2 }}>
          <div>→ Copy any art piece above and paste directly into chat, email, or code</div>
          <div>→ Best rendered in monospace fonts (Courier, Space Mono, Consolas)</div>
          <div>→ Use the TEXT tab to generate your own name in ASCII art</div>
          <div>→ Use the IMAGE tab to convert any photo to art</div>
        </div>
      </section>
    </div>
  )
}
