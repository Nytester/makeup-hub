import Link from 'next/link'

const STATS = [
  { num: '8+', label: 'Expert artists' },
  { num: '20+', label: 'Services offered' },
  { num: '4.9', label: 'Average rating' },
  { num: '100%', label: 'Cruelty-free' },
]

export default function EditorialBanner() {
  return (
    <section className="editorial-section" style={s.section}>
      <div>
        <p style={s.eyebrow}>In-store & online</p>
        <h2 style={s.headline}>
          Come in. Get glam.<br />
          <em style={{ color: '#E03030', fontStyle: 'italic' }}>Leave transformed.</em>
        </h2>
        <Link href="/services" style={s.btn}>Book a service →</Link>
      </div>

      <div style={s.stats}>
        {STATS.map(stat => (
          <div key={stat.num} style={{ textAlign: 'center' }}>
            <div style={s.statNum}>{stat.num}</div>
            <div style={s.statLabel}>{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

const s = {
  section: {
    background: '#1E0A0A', padding: '80px 64px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    gap: 48, flexWrap: 'wrap',
  },
  eyebrow: {
    fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 500,
    letterSpacing: '0.14em', textTransform: 'uppercase', color: '#A89080', marginBottom: 16,
  },
  headline: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(32px, 3.5vw, 52px)', fontWeight: 300, color: '#FDFAF7',
    lineHeight: 1.1, maxWidth: 480, letterSpacing: '-0.01em',
  },
  btn: {
    display: 'inline-block', marginTop: 28,
    background: 'transparent', border: '1.5px solid rgba(253,250,247,0.4)',
    color: '#FDFAF7', borderRadius: 2, padding: '12px 28px',
    fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500,
    letterSpacing: '0.01em', textDecoration: 'none',
  },
  stats: { display: 'flex', gap: 40, flexWrap: 'wrap' },
  statNum: {
    fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 300,
    color: '#FDFAF7', lineHeight: 1,
  },
  statLabel: {
    fontFamily: 'var(--font-body)', fontSize: 12, color: '#A89080',
    marginTop: 6, letterSpacing: '0.04em',
  },
}
