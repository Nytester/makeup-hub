'use client'
import Link from 'next/link'
import { useState } from 'react'

const COLS = [
  { title: 'Shop', links: [{ label: 'All products', href: '/shop' }, { label: 'Lips', href: '/shop?category=lips' }, { label: 'Face', href: '/shop?category=face' }, { label: 'Eyes', href: '/shop?category=eyes' }, { label: 'Wholesale', href: '/wholesale' }] },
  { title: 'Services', links: [{ label: 'Full Glam', href: '/services' }, { label: 'Everyday Look', href: '/services' }, { label: 'Bridal Makeup', href: '/services' }, { label: 'Makeup Lesson', href: '/services' }, { label: 'Book now', href: '/services' }] },
  { title: 'Visit Us', links: [{ label: '804 N 31st St, Monroe LA', href: '/visit' }, { label: 'Mon–Fri 10am–7pm', href: '/visit' }, { label: 'Sat 10am–8pm', href: '/visit' }, { label: 'Sun 11am–6pm', href: '/visit' }] },
  { title: 'Help', links: [{ label: 'FAQs', href: '#' }, { label: 'Contact us', href: '#' }, { label: 'Wholesale inquiry', href: '/wholesale' }, { label: 'About us', href: '#' }] },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) { setSubscribed(true); setEmail('') }
  }

  return (
    <footer style={s.footer}>
      <div style={s.top}>
        <div style={s.newsletter}>
          <p style={s.nlLabel}>Stay in the loop</p>
          <h3 style={s.nlTitle}>New drops, exclusive{'\n'}offers, beauty tips.</h3>
          {subscribed
            ? <p style={s.nlSuccess}>{"You're on the list."}</p>
            : (
              <form onSubmit={handleSubscribe} style={s.nlForm}>
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={s.nlInput}
                />
                <button type="submit" style={s.nlBtn}>Subscribe</button>
              </form>
            )
          }
        </div>

        <div style={s.links}>
          {COLS.map(col => (
            <div key={col.title} style={s.linkCol}>
              <p style={s.colTitle}>{col.title}</p>
              {col.links.map(link => (
                <Link key={link.label} href={link.href} style={s.colLink}>{link.label}</Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div style={s.bottom}>
        <p style={s.legal}>© 2026 Ann Paul Beauty. All rights reserved.</p>
        <div style={{ display: 'flex', gap: 20 }}>
          {['Privacy', 'Terms', 'Cookies'].map(item => (
            <Link key={item} href="#" style={s.legalLink}>{item}</Link>
          ))}
        </div>
      </div>
    </footer>
  )
}

const s = {
  footer: { background: '#2C2520', color: '#FDFAF7', fontFamily: 'var(--font-body)' },
  top: { display: 'flex', gap: 64, padding: '64px 64px 48px', borderBottom: '1px solid rgba(253,250,247,0.1)', flexWrap: 'wrap' },
  newsletter: { flex: '0 0 300px', maxWidth: 340 },
  nlLabel: { fontSize: 10, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#A89080', marginBottom: 12 },
  nlTitle: { fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 400, color: '#FDFAF7', lineHeight: 1.2, marginBottom: 24, whiteSpace: 'pre-line' },
  nlForm: { display: 'flex' },
  nlInput: {
    flex: 1, background: 'rgba(253,250,247,0.07)',
    border: '1px solid rgba(253,250,247,0.2)', borderRight: 'none',
    borderRadius: '2px 0 0 2px', color: '#FDFAF7',
    fontFamily: 'var(--font-body)', fontSize: 13, padding: '10px 14px', outline: 'none',
  },
  nlBtn: {
    background: '#C01818', border: 'none', color: '#FDFAF7',
    fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500,
    padding: '10px 18px', cursor: 'pointer', borderRadius: '0 2px 2px 0',
    letterSpacing: '0.01em', whiteSpace: 'nowrap',
  },
  nlSuccess: { fontSize: 13, color: '#E8B4AD', fontStyle: 'italic' },
  links: { flex: 1, display: 'flex', gap: 48, flexWrap: 'wrap' },
  linkCol: { display: 'flex', flexDirection: 'column', gap: 10, minWidth: 100 },
  colTitle: { fontSize: 10, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#A89080', marginBottom: 4 },
  colLink: { fontSize: 13, color: 'rgba(253,250,247,0.7)', textDecoration: 'none' },
  bottom: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 64px', flexWrap: 'wrap', gap: 12 },
  legal: { fontSize: 11, color: 'rgba(253,250,247,0.4)' },
  legalLink: { fontSize: 11, color: 'rgba(253,250,247,0.4)', textDecoration: 'none' },
}
