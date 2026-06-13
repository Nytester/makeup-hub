'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const CATS = [
  { name: 'Lips', sub: 'Lip gloss, lipstick, lip oils', href: '/shop?category=lips', color: '#6E1A1A' },
  { name: 'Face', sub: 'Foundation, blush, powder', href: '/shop?category=face', color: '#4A1010' },
  { name: 'Eyes', sub: 'Palettes, mascara, lashes', href: '/shop?category=eyes', color: '#1E0A0A' },
  { name: 'Wholesale', sub: 'Bulk & preorder requests', href: '/wholesale', color: '#C01818', cta: 'Inquire →' },
]

function CatCard({ cat }) {
  const [hovered, setHovered] = useState(false)
  const router = useRouter()

  return (
    <div
      className="cat-card"
      style={{
        background: cat.color, borderRadius: 4, padding: '40px 24px', cursor: 'pointer',
        transition: 'transform 200ms ease, box-shadow 200ms ease',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hovered ? '0 8px 24px rgba(192,24,24,0.25)' : 'none',
      }}
      onClick={() => router.push(cat.href)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <p style={s.sub}>{cat.sub}</p>
      <h3 style={s.name}>{cat.name}</h3>
      <div style={s.cta}>{cat.cta || 'Shop →'}</div>
    </div>
  )
}

export default function CategoryStrip() {
  return (
    <section style={s.section}>
      <div style={s.grid} className="cat-grid">
        {CATS.map(cat => <CatCard key={cat.name} cat={cat} />)}
      </div>
    </section>
  )
}

const s = {
  section: { padding: '64px 64px 0', background: '#FAF7F4' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 },
  sub: {
    fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 500,
    letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C8AFA8', marginBottom: 8,
  },
  name: {
    fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 400,
    color: '#FDFAF7', lineHeight: 1.1,
  },
  cta: { marginTop: 16, fontFamily: 'var(--font-body)', fontSize: 12, color: '#C8AFA8' },
}
