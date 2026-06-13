import Link from 'next/link'

export const metadata = {
  title: 'Visit Us — Makeup Hub',
}

const labelStyle = { fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#A89080' }

export default function VisitPage() {
  return (
    <div style={{ background: '#FAF7F4', padding: '48px 64px 80px', minHeight: '80vh' }}>
      <p style={{ ...labelStyle, marginBottom: 12 }}>Find us</p>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,4vw,52px)', fontWeight: 400, color: '#2C2520', lineHeight: 1.1, marginBottom: 40 }}>
        Visit the store
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
        <div>
          <div style={{ marginBottom: 36 }}>
            <p style={{ ...labelStyle, marginBottom: 12 }}>Address</p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: '#2C2520', lineHeight: 1.5 }}>
              804 North 31st Street<br />Monroe, LA Suite A
            </p>
          </div>

          <div style={{ marginBottom: 36 }}>
            <p style={{ ...labelStyle, marginBottom: 12 }}>Opening hours</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[['Monday – Friday', '10:00 am – 7:00 pm'], ['Saturday', '10:00 am – 8:00 pm'], ['Sunday', '11:00 am – 6:00 pm']].map(([day, hrs]) => (
                <div key={day} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F0EAE3' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#4A3F3A' }}>{day}</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#6B5E58' }}>{hrs}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 36 }}>
            <p style={{ ...labelStyle, marginBottom: 12 }}>Contact</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#4A3F3A', lineHeight: 1.8 }}>
              hello@makeuphub.com<br />+1 (318) 366 9476
            </p>
          </div>

          <Link href="/services" style={{ display: 'inline-block', background: '#C01818', color: '#FDFAF7', borderRadius: 2, padding: '13px 28px', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500, textDecoration: 'none' }}>
            Book a service
          </Link>
        </div>

        <div style={{ borderRadius: 4, overflow: 'hidden', aspectRatio: '4/3', boxShadow: '0 4px 16px rgba(44,37,32,0.08)' }}>
          <iframe
            src="https://maps.google.com/maps?q=804+N+31st+St,+Monroe,+LA+71201&output=embed&z=16"
            width="100%"
            height="100%"
            style={{ border: 'none', display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  )
}
