'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useCart } from '@/context/CartContext'

const navLinks = [
  { label: 'Shop', href: '/shop' },
  { label: 'Services', href: '/services' },
  { label: 'Wholesale', href: '/wholesale' },
  { label: 'Visit Us', href: '/visit' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { count } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (href) => {
    const path = href.split('?')[0]
    return pathname === path || (path !== '/' && pathname.startsWith(path))
  }

  return (
    <>
      <div style={s.announcement}>
        Free delivery on orders over $50 —{' '}
        <Link href="/shop" style={{ textDecoration: 'underline', color: 'inherit' }}>Shop now</Link>
      </div>

      <nav style={{
        ...s.nav,
        background: scrolled ? 'rgba(250,247,244,0.95)' : '#FAF7F4',
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
        boxShadow: scrolled ? '0 2px 8px rgba(44,37,32,0.06)' : 'none',
        borderBottom: scrolled ? 'none' : '1px solid #DDD0C4',
      }}>
        <Link href="/" style={s.logo}>
        <img src="/images/logo.jpg" alt="Business Logo" style={s.logoImg} />
        </Link>

        <div style={s.links} className="desktop-links">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              style={{ ...s.link, color: isActive(link.href) ? '#C01818' : '#2C2520' }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div style={s.actions}>
          <button style={s.iconBtn} aria-label="Search">
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
              <circle cx={11} cy={11} r={8} />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>

          <button style={s.iconBtn} aria-label="Account">
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx={12} cy={7} r={4} />
            </svg>
          </button>

          <Link href="/cart" style={{ ...s.iconBtn, position: 'relative' }} aria-label="Bag">
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1={3} y1={6} x2={21} y2={6} />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {count > 0 && <span style={s.badge}>{count}</span>}
          </Link>

          <button
            style={{ ...s.iconBtn, display: 'none' }}
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
              <line x1={3} y1={6} x2={21} y2={6} />
              <line x1={3} y1={12} x2={21} y2={12} />
              <line x1={3} y1={18} x2={21} y2={18} />
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div style={s.mobileMenu}>
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              style={s.mobileLink}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}

const s = {
  announcement: {
    background: '#C01818', color: '#FDFAF7',
    fontSize: 12, fontWeight: 400, letterSpacing: '0.04em',
    textAlign: 'center', padding: '9px 16px',
    fontFamily: 'var(--font-body)',
  },
  nav: {
    position: 'sticky', top: 0, zIndex: 100,
    padding: '0 64px', height: 64,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    transition: 'all 200ms ease',
  },
  logo: {
    fontFamily: 'var(--font-display)',
    fontSize: 28, fontWeight: 400, color: '#2C2520',
    letterSpacing: '-0.01em', userSelect: 'none', textDecoration: 'none',
  },
  links: { display: 'flex', gap: 32 },
  link: {
    fontFamily: 'var(--font-body)',
    fontSize: 13, fontWeight: 400,
    textDecoration: 'none', letterSpacing: '0.01em', transition: 'color 150ms ease',
  },
  actions: { display: 'flex', gap: 12, alignItems: 'center' },
  iconBtn: {
    background: 'none', border: 'none', cursor: 'pointer',
    color: '#2C2520', padding: 4, display: 'flex', alignItems: 'center',
    transition: 'color 150ms ease', textDecoration: 'none',
  },
  badge: {
    position: 'absolute', top: -2, right: -2,
    background: '#C01818', color: '#fff',
    fontSize: 8, fontWeight: 600, width: 14, height: 14,
    borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  mobileMenu: {
    position: 'fixed', top: 112, left: 0, right: 0, zIndex: 99,
    background: '#FAF7F4', borderBottom: '1px solid #DDD0C4',
    padding: '16px 24px', display: 'flex', flexDirection: 'column',
  },
  mobileLink: {
    fontFamily: 'var(--font-body)',
    fontSize: 15, color: '#2C2520', padding: '12px 0',
    borderBottom: '1px solid #F0EAE3', textDecoration: 'none', display: 'block',
  },
  logoImg: {
    height: 44,
    width: 'auto',
    display: 'block',
  },
}
