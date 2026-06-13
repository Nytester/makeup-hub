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

      {/* ── Warm top accent stripe ── */}
      <div style={s.topAccent} />

      {/* ── Header ── */}
      <div style={s.topBar}>
        <span style={s.topBarLine} />
        <div style={s.topBarCenter}>
          <span style={s.diamond}>✦</span>
          <span style={s.topBarText}>EXCLUSIVE · LIMITED EDITION</span>
          <span style={s.diamond}>✦</span>
        </div>
        <span style={s.topBarLine} />
      </div>

      {/* ── Two-column body ── */}
      <div style={s.body}>

        {/* Left — image placeholders */}
        <div style={s.imageCol}>
          <div style={s.imgMain}>
            <div style={s.imgMainInner}>
              <span style={s.imgLabel}>— PRODUCT IMAGE —</span>
              <span style={s.imgSub}>A.P. LUX KIT</span>
            </div>
            <div style={s.exclusiveBadge}>✦ EXCLUSIVE</div>
          </div>
          <div style={s.imgThumbRow}>
            <div style={{ ...s.imgThumb, background: '#D4B49A' }}>
              <span style={s.imgThumbLabel}>— VIEW 2 —</span>
            </div>
            <div style={{ ...s.imgThumb, background: '#E8D5C0' }}>
              <span style={s.imgThumbLabel}>— VIEW 3 —</span>
            </div>
          </div>
        </div>

        {/* Right — details */}
        <div style={s.detailCol}>

          <p style={s.brand}>MAKEUP HUB · A.P. COLLECTION</p>

          <h2 style={s.kitName}>A.P. LUX KIT</h2>

          {/* gold rule under title */}
          <div style={s.goldRule} />

          <p style={s.tagline}>
            You Don't Need to be a Makeup Artist<br />
            <em>to Look Like One.</em>
          </p>

          <p style={s.desc}>
            The A.P. LUX KIT was designed for everyday women who want a polished,
            soft glam look without spending hundreds of dollars on trial-and-error products.
          </p>

          <div style={s.divider} />

          {/* Price */}
          <div style={s.priceRow}>
            <span style={s.price}>$45.00</span>
            <div style={s.priceMeta}>
              <span style={s.priceMetaMain}>USD</span>
              <span style={s.priceDot}>·</span>
              <span style={s.priceMetaFree}>FREE US SHIPPING</span>
            </div>
          </div>

          <div style={s.divider} />

          {/* Essentials accordion */}
          <button style={s.accordionBtn} onClick={() => setListOpen(!listOpen)}>
            <div style={s.accordionLeft}>
              <span style={s.accordionDiamond}>✦</span>
              <span style={s.accordionLabel}>Nine Essentials Included</span>
            </div>
            <span style={{
              transform: listOpen ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.25s ease',
              display: 'inline-block', fontSize: 10,
              color: '#9C7A5A',
            }}>▾</span>
          </button>

          {listOpen && (
            <div style={s.essentialsList}>
              {ESSENTIALS.map(e => (
                <div key={e.num} style={s.essentialRow}>
                  <span style={s.essentialNum}>{e.num}</span>
                  <span style={s.essentialDot}>·</span>
                  <span style={s.essentialName}>{e.name}</span>
                </div>
              ))}
            </div>
          )}

          <div style={s.divider} />

          {/* Soft glam tags */}
          <div style={s.tagRow}>
            {['Soft Glam', 'Clean Formula', 'All Skin Tones', 'Cruelty-Free'].map(t => (
              <span key={t} style={s.tag}>{t}</span>
            ))}
          </div>

          <div style={s.divider} />

          {/* Shipping */}
          <div style={s.shippingBox}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <svg style={{ flexShrink: 0, marginTop: 2 }} width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#C9A87C" strokeWidth={1.4}>
                <path d="M3 7h11v9H3z"/><path d="M14 10h4l3 3v3h-7"/><circle cx="7" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/>
              </svg>
              <div>
                <div style={s.shippingTitle}>Ships within 3 weeks of preorder</div>
                <div style={s.shippingSub}>UNITED STATES ONLY · FREE DOMESTIC SHIPPING · PAYMENT AT CHECKOUT</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom accent ── */}
      <div style={s.bottomAccent}>
        <span style={s.bottomLine} />
        <span style={s.bottomDiamond}>✦</span>
        <span style={s.bottomLine} />
      </div>

    </div>
  )
}

const s = {
  wrap: {
    background: 'linear-gradient(160deg, #F9F2EA 0%, #F4E9DC 60%, #EFE0CF 100%)',
    borderBottom: '1px solid #D9C4AE',
    paddingBottom: 56,
  },

  topAccent: {
    height: 3,
    background: 'linear-gradient(90deg, transparent, #C9A87C 30%, #B8935A 50%, #C9A87C 70%, transparent)',
  },

  topBar: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    gap: 16, padding: '36px 24px 28px',
  },
  topBarLine: {
    flex: 1, maxWidth: 80, height: 1,
    background: 'linear-gradient(90deg, transparent, #C9A87C)',
  },
  topBarCenter: {
    display: 'flex', alignItems: 'center', gap: 10,
  },
  topBarText: {
    fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 500,
    letterSpacing: '0.38em', color: '#8B6A4A',
  },
  diamond: {
    fontSize: 8, color: '#C9A87C',
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
    background: 'linear-gradient(135deg, #C4956A 0%, #A97B56 40%, #8B6040 100%)',
    aspectRatio: '4 / 5',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    position: 'relative', overflow: 'hidden',
  },
  imgMainInner: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
    border: '1px solid rgba(255,245,235,0.25)',
    padding: '28px 36px',
  },
  imgLabel: {
    fontFamily: 'var(--font-body)', fontSize: 9, letterSpacing: '0.32em',
    color: 'rgba(255,245,230,0.7)', textTransform: 'uppercase',
  },
  imgSub: {
    fontFamily: 'var(--font-display)', fontStyle: 'italic',
    fontSize: 14, color: 'rgba(255,245,230,0.5)', letterSpacing: '0.06em',
  },
  exclusiveBadge: {
    position: 'absolute', top: 18, left: 18,
    background: 'rgba(44,21,8,0.72)',
    backdropFilter: 'blur(4px)',
    color: '#F5E6D0',
    fontFamily: 'var(--font-body)', fontSize: 8.5, fontWeight: 500,
    letterSpacing: '0.26em', padding: '5px 13px',
    border: '1px solid rgba(201,168,124,0.4)',
  },
  imgThumbRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 },
  imgThumb: {
    aspectRatio: '1 / 1',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  imgThumbLabel: {
    fontFamily: 'var(--font-body)', fontSize: 8.5, letterSpacing: '0.24em',
    color: '#8B6A4A', textTransform: 'uppercase',
  },

  // detail column
  detailCol: {
    padding: '4px 0 0 52px',
    display: 'flex', flexDirection: 'column',
  },
  brand: {
    fontFamily: 'var(--font-body)', fontSize: 9, fontWeight: 500,
    letterSpacing: '0.32em', color: '#9C7A5A', marginBottom: 12,
  },
  kitName: {
    fontFamily: 'var(--font-display)', fontSize: 'clamp(38px, 4.5vw, 58px)',
    fontWeight: 400, color: '#3D1F0A', margin: '0 0 14px', lineHeight: 1.02,
    letterSpacing: '0.02em',
  },
  goldRule: {
    height: 1.5, width: 56, marginBottom: 20,
    background: 'linear-gradient(90deg, #C9A87C, #B8935A)',
  },
  tagline: {
    fontFamily: 'var(--font-display)',
    fontSize: 18, color: '#5C3520', lineHeight: 1.55, margin: '0 0 16px',
    fontWeight: 300,
  },
  desc: {
    fontFamily: 'var(--font-display)', fontSize: 14, lineHeight: 1.7,
    color: '#7A5540', margin: '0 0 4px', fontWeight: 300,
  },
  divider: {
    height: 1,
    background: 'linear-gradient(90deg, #D4B49A, #C4A488, transparent)',
    margin: '20px 0',
  },
  priceRow: {
    display: 'flex', alignItems: 'baseline', gap: 12,
  },
  price: {
    fontFamily: 'var(--font-display)', fontSize: 44, fontWeight: 300,
    color: '#3D1F0A', letterSpacing: '0.01em', lineHeight: 1,
  },
  priceMeta: {
    display: 'flex', alignItems: 'center', gap: 6,
  },
  priceMetaMain: {
    fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.22em', color: '#9C7A5A',
  },
  priceDot: {
    color: '#C9A87C', fontSize: 10,
  },
  priceMetaFree: {
    fontFamily: 'var(--font-body)', fontSize: 9.5, letterSpacing: '0.18em', color: '#B8935A',
  },
  accordionBtn: {
    background: 'none', border: 0, padding: '12px 0',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    width: '100%', cursor: 'pointer',
  },
  accordionLeft: { display: 'flex', alignItems: 'center', gap: 9 },
  accordionDiamond: { fontSize: 8, color: '#C9A87C' },
  accordionLabel: {
    fontFamily: 'var(--font-display)', fontSize: 15.5, color: '#3D1F0A', fontWeight: 400,
  },
  essentialsList: { paddingBottom: 4 },
  essentialRow: {
    display: 'flex', alignItems: 'baseline', gap: 12,
    padding: '8px 10px',
    borderBottom: '1px solid rgba(196,164,136,0.3)',
    background: 'rgba(255,245,235,0.4)',
  },
  essentialNum: {
    fontFamily: 'var(--font-body)', fontSize: 9, fontWeight: 600,
    letterSpacing: '0.22em', color: '#C9A87C', minWidth: 22,
  },
  essentialDot: {
    color: '#C4A488', fontSize: 10,
  },
  essentialName: {
    fontFamily: 'var(--font-display)', fontSize: 14.5, color: '#4A2810', fontWeight: 300,
  },
  tagRow: {
    display: 'flex', flexWrap: 'wrap', gap: 8,
  },
  tag: {
    fontFamily: 'var(--font-body)', fontSize: 9, letterSpacing: '0.2em',
    color: '#8B6A4A', border: '1px solid #C9A87C',
    padding: '4px 12px',
    background: 'rgba(255,245,235,0.6)',
  },
  shippingBox: {
    background: 'linear-gradient(135deg, #3D1F0A 0%, #5C3520 100%)',
    padding: '16px 20px',
    border: '1px solid rgba(201,168,124,0.2)',
  },
  shippingTitle: {
    fontFamily: 'var(--font-display)', fontSize: 13.5, fontWeight: 400,
    marginBottom: 5, color: '#F5E6D0', letterSpacing: '0.01em',
  },
  shippingSub: {
    fontFamily: 'var(--font-body)', fontSize: 8.5, letterSpacing: '0.18em',
    color: '#C9A87C', lineHeight: 1.7,
  },
  bottomAccent: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    gap: 14, padding: '40px 24px 0',
  },
  bottomLine: {
    flex: 1, maxWidth: 80, height: 1,
    background: 'linear-gradient(90deg, transparent, #C9A87C)',
  },
  bottomDiamond: { fontSize: 8, color: '#C9A87C' },
}
