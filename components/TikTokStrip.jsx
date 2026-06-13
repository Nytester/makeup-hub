const VIDEOS = [
  {
    id: '7464697620628344106', // ← replace with your TikTok video ID
    caption: 'Full glam tutorial',
  },
  {
    id: '7421620384790924590', // ← replace with your TikTok video ID
    caption: 'Everyday makeup look',
  },
]

export default function TikTokStrip() {
  return (
    <section style={s.section}>
      <div style={s.inner}>
        <div style={s.header}>
          <p style={s.eyebrow}>As seen on TikTok</p>
          <h2 style={s.headline}>Watch us work</h2>
        </div>

        <div style={s.grid}>
          {VIDEOS.map((v) => (
            <div key={v.id} style={s.card}>
              <div style={s.embedWrap}>
                <iframe
                  src={`https://www.tiktok.com/embed/v2/${v.id}`}
                  style={s.iframe}
                  allowFullScreen
                  allow="encrypted-media"
                  scrolling="no"
                  frameBorder="0"
                />
              </div>
              <p style={s.caption}>{v.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const s = {
  section: {
    background: '#FAF7F4',
    padding: '72px 64px',
  },
  inner: {
    maxWidth: 900,
    margin: '0 auto',
  },
  header: {
    marginBottom: 40,
  },
  eyebrow: {
    fontFamily: 'var(--font-body)',
    fontSize: 11, fontWeight: 500, letterSpacing: '0.14em',
    textTransform: 'uppercase', color: '#A89080', marginBottom: 10,
  },
  headline: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(28px, 3vw, 44px)',
    fontWeight: 300, color: '#2C2520',
    letterSpacing: '-0.01em', lineHeight: 1.1,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 24,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  embedWrap: {
    width: '100%',
    aspectRatio: '9 / 16',
    borderRadius: 12,
    overflow: 'hidden',
    boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
  },
  iframe: {
    width: '100%',
    height: '100%',
    border: 'none',
    display: 'block',
  },
  caption: {
    fontFamily: 'var(--font-body)',
    fontSize: 12, color: '#A89080',
    letterSpacing: '0.04em',
  },
}
