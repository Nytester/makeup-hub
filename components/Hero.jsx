'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Hero() {
  const [primaryHovered, setPrimaryHovered] = useState(false)

  return (
    <section className="hero-section" style={s.section}>
      <div className="hero-content" style={s.content}>
        <p style={s.eyebrow}>Professional Makeup Shop & Studio</p>
        <h1 style={s.headline}>
          Where beauty<br />
          <em style={s.italic}>comes alive.</em>
        </h1>
        <p style={s.sub}>
          Shop professional makeup in-store or online — and let our expert artists transform your look. Walk-ins welcome.
        </p>
        <div style={s.ctaRow}>
          <Link
            href="/services"
            style={{ ...s.btnPrimary, background: primaryHovered ? '#991212' : '#C01818' }}
            onMouseEnter={() => setPrimaryHovered(true)}
            onMouseLeave={() => setPrimaryHovered(false)}
          >
            Book a service
          </Link>
          <Link href="/shop" style={s.btnGhost}>Shop products →</Link>
        </div>
      </div>

      <div className="hero-image-wrap" style={s.imageWrap}>
        <div style={s.imagePlaceholder}>
          <img src="/images/work1.jpg" alt="Makeup studio" style={s.heroImg} />
          <div style={s.imageBadge}>New in</div>
        </div>
        <div style={s.swatchStrip}>
          {['#E8B4AD','#C4614A','#B8726E','#6B2D3E','#2C2520'].map((c, i) => (
            <div key={i} style={{ ...s.swatchDot, background: c }} />
          ))}
        </div>
        <div style={s.placeholderLabel}>Hero photography</div>
      </div>
    </section>
  )
}

const s = {
  section: {
    display: 'flex', alignItems: 'stretch',
    minHeight: 'calc(100vh - 112px)', background: '#FAF7F4',
  },
  content: {
    flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
    padding: '80px 64px', maxWidth: 560,
  },
  eyebrow: {
    fontFamily: 'var(--font-body)',
    fontSize: 11, fontWeight: 500, letterSpacing: '0.14em',
    textTransform: 'uppercase', color: '#A89080', marginBottom: 20,
  },
  headline: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(52px, 5.5vw, 80px)',
    fontWeight: 300, lineHeight: 1.05, letterSpacing: '-0.02em',
    color: '#2C2520', marginBottom: 24,
  },
  italic: { fontStyle: 'italic', color: '#C01818' },
  sub: {
    fontFamily: 'var(--font-body)',
    fontSize: 16, lineHeight: 1.7, color: '#4A3F3A',
    marginBottom: 36, maxWidth: 400,
  },
  ctaRow: { display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' },
  btnPrimary: {
    fontFamily: 'var(--font-body)',
    color: '#FDFAF7', borderRadius: 2, cursor: 'pointer',
    padding: '14px 32px', fontSize: 14, fontWeight: 500,
    letterSpacing: '0.01em', transition: 'background 150ms ease',
    textDecoration: 'none', display: 'inline-block',
  },
  btnGhost: {
    fontFamily: 'var(--font-body)',
    color: '#2C2520', fontSize: 14, fontWeight: 400,
    textDecoration: 'underline', textUnderlineOffset: 3,
    letterSpacing: '0.01em',
  },
  imageWrap: { flex: 1, minHeight: 500, display: 'flex', flexDirection: 'column' },
  imagePlaceholder: {
    flex: 1, minHeight: 500,
    background: '#F0EAE3',
    position: 'relative', overflow: 'hidden',
  },
  heroImg: {
    width: '100%', height: '100%', objectFit: 'cover', display: 'block',
  },
  imageBadge: {
    position: 'absolute', top: 32, left: 32,
    background: '#2C2520', color: '#FDFAF7',
    fontFamily: 'var(--font-body)',
    fontSize: 9, fontWeight: 500, letterSpacing: '0.12em',
    textTransform: 'uppercase', padding: '4px 10px', borderRadius: 2,
  },
  swatchStrip: { display: 'flex', gap: 8, padding: '16px 0 8px' },
  swatchDot: {
    width: 20, height: 20, borderRadius: '50%',
    border: '2px solid rgba(253,250,247,0.6)',
  },
  placeholderLabel: {
    fontFamily: 'var(--font-body)', fontSize: 12, color: '#A89080', letterSpacing: '0.04em',
  },
}
