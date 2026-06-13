'use client'
import { useState } from 'react'

const ESSENTIALS = [
  { num: '01', name: 'Foundation' },
  { num: '02', name: 'Concealer' },
  { num: '03', name: 'Setting Powder' },
  { num: '04', name: 'Setting Spray' },
  { num: '05', name: 'Blush' },
  { num: '06', name: 'Eyeshadow / Contour' },
  { num: '07', name: 'Lip Gloss' },
  { num: '08', name: 'Brush Set' },
  { num: '09', name: 'Primer' },
]

export default function LuxKitBanner() {
  const [listOpen, setListOpen] = useState(false)

  return (
    <div style={s.wrap}>

      {/* ── Top label bar ── */}
      <div style={s.topBar}>
        <span style={s.topBarLine} />
        <span style={s.topBarText}>EXCLUSIVE · LIMITED EDITION</span>
        <span style={s.topBarLine} />
      </div>

      {/* ── Two-column body ── */}
      <div style={s.body}>

        {/* Left — image placeholders */}
        <div style={s.imageCol}>
          <div style={s.imgMain}>
            <span style={s.imgLabel}>— PRODUCT IMAGE —</span>
            <div style={s.exclusiveBadge}>EXCLUSIVE</div>
          </div>
          <div style={s.imgThumbRow}>
            <div style={s.imgThumb}>
              <span style={s.imgThumbLabel}>— VIEW 2 —</span>
            </div>
            <div style={s.imgThumb}>
              <span style={s.imgThumbLabel}>— VIEW 3 —</span>
            </div>
          </div>
        </div>

        {/* Right — details */}
        <div style={s.detailCol}>

          <p style={s.brand}>MAKEUP HUB · A.P. COLLECTION</p>
          <h2 style={s.kitName}>A.P. LUX KIT</h2>

          <p style={s.tagline}>
            💋 You Don't Need to be a Makeup Artist<br />to Look Like One.
          </p>

          <p style={s.desc}>
            The A.P. LUX KIT was designed for everyday women who want a polished,
            soft glam look without spending hundreds of dollars on trial-and-error products.
          </p>

          <div style={s.divider} />

          <div style={s.priceRow}>
            <span style={s.price}>$45.00</span>
            <span style={s.priceMeta}>USD · FREE US SHIPPING</span>
          </div>

          <div style={s.divider} />

          {/* Essentials accordion */}
          <button style={s.accordionBtn} onClick={() => setListOpen(!listOpen)}>
            <span style={s.accordionLabel}>Eight Essentials Included</span>
            <span style={{ transform: listOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', display: 'inline-block', fontSize: 11 }}>▾</span>
          </button>

          {listOpen && (
            <div style={s.essentialsList}>
              {ESSENTIALS.map(e => (
                <div key={e.num} style={s.essentialRow}>
                  <span style={s.essentialNum}>{e.num}</span>
                  <span style={s.essentialName}>{e.name}</span>
                </div>
              ))}
            </div>
          )}

          <div style={s.divider} />

          <div style={s.shippingBox}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <svg style={{ flexShrink: 0, marginTop: 1 }} width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="#B8935A" strokeWidth={1.3}>
                <path d="M3 7h11v9H3z"/><path d="M14 10h4l3 3v3h-7"/><circle cx="7" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/>
              </svg>
              <div>
                <div style={s.shippingTitle}>Ships within 3 weeks of preorder</div>
                <div style={s.shippingSub}>UNITED STATES ONLY · FREE DOMESTIC SHIPPING</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

const s = {
  wrap: {
    background: '#FAF7F4',
    borderBottom: '1px solid #DDD0C4',
    paddingBottom: 64,
  },
  topBar: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    gap: 14, padding: '40px 24px 32px',
  },
  topBarLine: {
    display: 'inline-block', width: 48, height: 1, background: '#C4B4A6',
  },
  topBarText: {
    fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 500,
    letterSpacing: '0.34em', color: '#6B5E58',
  },
  body: {
    display: 'grid',
    gridTemplateColumns: '55fr 45fr',
    gap: 0,
    maxWidth: 1100,
    margin: '0 auto',
    padding: '0 48px',
  },

  // image column
  imageCol: { display: 'flex', flexDirection: 'column', gap: 10 },
  imgMain: {
    background: '#EDE5DC',
    aspectRatio: '4 / 5',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    position: 'relative', overflow: 'hidden',
  },
  imgLabel: {
    fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.28em',
    color: '#A89080', textTransform: 'uppercase',
  },
  exclusiveBadge: {
    position: 'absolute', top: 16, left: 16,
    background: '#2C2520', color: '#FDFAF7',
    fontFamily: 'var(--font-body)', fontSize: 9, fontWeight: 500,
    letterSpacing: '0.22em', padding: '5px 12px',
  },
  imgThumbRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 },
  imgThumb: {
    background: '#E8DEDD',
    aspectRatio: '1 / 1',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  imgThumbLabel: {
    fontFamily: 'var(--font-body)', fontSize: 9, letterSpacing: '0.22em',
    color: '#A89080', textTransform: 'uppercase',
  },

  // detail column
  detailCol: {
    padding: '0 0 0 48px',
    display: 'flex', flexDirection: 'column',
  },
  brand: {
    fontFamily: 'var(--font-body)', fontSize: 9.5, fontWeight: 500,
    letterSpacing: '0.28em', color: '#A89080', marginBottom: 10,
  },
  kitName: {
    fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 4vw, 54px)',
    fontWeight: 400, color: '#2C2520', margin: '0 0 16px', lineHeight: 1.05,
    letterSpacing: '0.01em',
  },
  tagline: {
    fontFamily: 'var(--font-display)', fontStyle: 'italic',
    fontSize: 17, color: '#2C2520', lineHeight: 1.5, margin: '0 0 16px',
  },
  desc: {
    fontFamily: 'var(--font-display)', fontSize: 14.5, lineHeight: 1.65,
    color: '#6B5E58', margin: '0 0 4px',
  },
  divider: { height: 1, background: '#DDD0C4', margin: '18px 0' },
  priceRow: {
    display: 'flex', alignItems: 'baseline', gap: 10,
  },
  price: {
    fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 400,
    color: '#2C2520', letterSpacing: '0.01em', lineHeight: 1,
  },
  priceMeta: {
    fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.2em', color: '#A89080',
  },
  accordionBtn: {
    background: 'none', border: 0, padding: '14px 0',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    width: '100%', cursor: 'pointer',
  },
  accordionLabel: {
    fontFamily: 'var(--font-display)', fontSize: 16, color: '#2C2520', fontWeight: 400,
  },
  essentialsList: { paddingBottom: 8 },
  essentialRow: {
    display: 'flex', alignItems: 'baseline', gap: 14,
    padding: '7px 0', borderBottom: '1px solid #EDE5DC',
  },
  essentialNum: {
    fontFamily: 'var(--font-body)', fontSize: 9.5, fontWeight: 500,
    letterSpacing: '0.2em', color: '#B8935A', minWidth: 22,
  },
  essentialName: {
    fontFamily: 'var(--font-display)', fontSize: 15, color: '#2C2520',
  },
  shippingBox: {
    background: '#2C2520', color: '#FDFAF7',
    padding: '16px 18px', marginTop: 4,
  },
  shippingTitle: {
    fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 500,
    marginBottom: 4, color: '#FDFAF7',
  },
  shippingSub: {
    fontFamily: 'var(--font-body)', fontSize: 9, letterSpacing: '0.18em',
    color: '#A89080', lineHeight: 1.6,
  },
}
