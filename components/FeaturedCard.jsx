'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function FeaturedCard({ product, index = 0 }) {
  const [imgError, setImgError] = useState(false)
  const [qty, setQty] = useState(1)
  const [activeShade, setActiveShade] = useState(0)
  const [accordionOpen, setAccordionOpen] = useState(false)
  const router = useRouter()
  const showImage = product.image && !imgError
  const vol = String(index + 1).padStart(2, '0')

  return (
    <div style={s.wrap}>

      {/* ── Section header ── */}
      <div style={s.sectionHead}>
        <div style={s.eyebrowRow}>
          <span style={s.ruleLine} />
          <span style={s.eyebrow}>FEATURED · VOL. {vol}</span>
          <span style={s.ruleLine} />
        </div>
        <h2 style={s.sectionTitle}>{product.name}</h2>
        {product.desc && (
          <p style={s.sectionSub}>{product.desc}</p>
        )}
      </div>

      {/* ── Two-column body ── */}
      <div className="featured-body" style={s.body}>

        {/* Left — image */}
        <div style={s.imageCol}>
          <div style={{ ...s.imgWrap, background: product.imgBg || '#EDE5DC' }}>
            {showImage ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 55vw"
                style={{ objectFit: 'cover' }}
                onError={() => setImgError(true)}
              />
            ) : (
              <div style={s.imgPlaceholder}>
                <div style={s.imgPlaceholderText}>— PRODUCT IMAGE —</div>
              </div>
            )}
            {product.badge && (
              <div style={s.imgBadge}>
                {product.badge.toUpperCase().replace('-', ' ')} · VOL. {vol}
              </div>
            )}
          </div>
        </div>

        {/* Right — details */}
        <div className="featured-detail-col" style={s.detailCol}>

          <div style={s.brandLabel}>MAKEUP HUB · {product.badge ? product.badge.toUpperCase().replace('-', ' ') : 'FEATURED'}</div>
          <h3 style={s.name}>{product.name}</h3>
          <p style={s.subDesc}>{product.desc}</p>

          {product.rating && (
            <div style={s.ratingRow}>
              <div style={{ display: 'flex', gap: 2 }}>
                {[1,2,3,4,5].map(i => (
                  <svg key={i} width={13} height={13} viewBox="0 0 24 24" fill={i <= Math.round(product.rating) ? '#B8935A' : '#DDD0C4'} stroke="none">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <span style={s.ratingMeta}>{product.rating} · EARLY REVIEWS · COMING SOON</span>
            </div>
          )}

          <div style={s.divider} />

          <div style={s.priceRow}>
            {product.price != null ? (
              <>
                <span style={s.price}>${product.price}</span>
                <span style={s.priceMeta}>USD · FREE US SHIPPING</span>
              </>
            ) : (
              <span style={s.requestPrice}>Pricing available on request</span>
            )}
          </div>

          {(product.longDesc || product.desc) && (
            <p style={s.bodyDesc}>
              {product.longDesc || product.desc}
            </p>
          )}

          {product.shades && product.shades.length > 0 && (
            <div style={s.shadesWrap}>
              <div style={s.shadesLabel}>SHADE</div>
              <div style={s.swatches}>
                {product.shades.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveShade(i)}
                    style={{
                      ...s.swatch,
                      background: color,
                      outline: activeShade === i ? '2px solid #2C2520' : 'none',
                      outlineOffset: 3,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          <div style={s.ctaRow}>
            <div style={s.qtyWrap}>
              <button style={s.qtyBtn} onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
              <span style={s.qtyNum}>{qty}</span>
              <button style={s.qtyBtn} onClick={() => setQty(qty + 1)}>+</button>
            </div>
            <button style={s.cta} onClick={() => router.push(`/product/${product.id}`)}>
              VIEW DETAILS
            </button>
          </div>

          <div style={s.shippingBox}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <svg style={{ flexShrink: 0, marginTop: 1 }} width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#B8935A" strokeWidth={1.3}>
                <path d="M3 7h11v9H3z"/><path d="M14 10h4l3 3v3h-7"/><circle cx="7" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/>
              </svg>
              <div>
                <div style={s.shippingTitle}>Ships within 3 weeks of preorder</div>
                <div style={s.shippingSub}>UNITED STATES ONLY · PAYMENT CAPTURED AT CHECKOUT · FREE DOMESTIC SHIPPING</div>
              </div>
            </div>
          </div>

          <div style={s.featureRow}>
            {[
              { icon: '♡', label: 'Cruelty-Free', sub: 'ALWAYS' },
              { icon: '✦', label: 'Professional', sub: 'GRADE' },
              { icon: '◎', label: 'All Skin Tones', sub: 'INCLUSIVE' },
            ].map(f => (
              <div key={f.label} style={s.featureItem}>
                <span style={s.featureIcon}>{f.icon}</span>
                <div style={s.featureLabel}>{f.label}</div>
                <div style={s.featureSub}>{f.sub}</div>
              </div>
            ))}
          </div>

          <div style={s.divider} />

          <button style={s.accordionBtn} onClick={() => setAccordionOpen(!accordionOpen)}>
            <span style={s.accordionLabel}>What's included</span>
            <span style={{ transform: accordionOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', display: 'inline-block', fontSize: 12 }}>▾</span>
          </button>
          {accordionOpen && (
            <div style={s.accordionBody}>
              <p style={s.accordionText}>
                All items are professionally sourced and curated. Full product details and specifications are available on the product page.
              </p>
            </div>
          )}

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
    marginBottom: 24,
  },

  // section header
  sectionHead: {
    textAlign: 'center',
    padding: '48px 24px 36px',
  },
  eyebrowRow: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    gap: 14, marginBottom: 16,
  },
  ruleLine: {
    display: 'inline-block', width: 48, height: 1, background: '#C4B4A6',
  },
  eyebrow: {
    fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 500,
    letterSpacing: '0.34em', color: '#6B5E58',
  },
  sectionTitle: {
    fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 58px)',
    fontWeight: 400, color: '#2C2520', margin: '0 0 12px', letterSpacing: '0.01em', lineHeight: 1.05,
  },
  sectionSub: {
    fontFamily: 'var(--font-display)', fontStyle: 'italic',
    fontSize: 17, color: '#6B5E58', margin: 0, lineHeight: 1.5,
  },

  // two-column
  body: {
    display: 'grid',
    gridTemplateColumns: '55fr 45fr',
    gap: 0,
    maxWidth: 1100,
    margin: '0 auto',
    padding: '0 48px',
  },

  // image col
  imageCol: {},
  imgWrap: {
    position: 'relative',
    aspectRatio: '4 / 5',
    overflow: 'hidden',
  },
  imgPlaceholder: {
    width: '100%', height: '100%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  imgPlaceholderText: {
    fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.28em',
    color: '#A89080', textTransform: 'uppercase',
  },
  imgBadge: {
    position: 'absolute', top: 16, left: 16,
    background: '#2C2520', color: '#FDFAF7',
    fontFamily: 'var(--font-body)', fontSize: 9, fontWeight: 500,
    letterSpacing: '0.22em', padding: '5px 12px',
  },

  // detail col
  detailCol: {
    padding: '8px 0 0 48px',
    display: 'flex', flexDirection: 'column',
  },
  brandLabel: {
    fontFamily: 'var(--font-body)', fontSize: 9.5, fontWeight: 500,
    letterSpacing: '0.28em', color: '#A89080', marginBottom: 10,
  },
  name: {
    fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3.5vw, 44px)',
    fontWeight: 400, color: '#2C2520', margin: '0 0 6px', lineHeight: 1.05,
    letterSpacing: '0.01em',
  },
  subDesc: {
    fontFamily: 'var(--font-display)', fontStyle: 'italic',
    fontSize: 15, color: '#6B5E58', margin: '0 0 14px', lineHeight: 1.4,
  },
  ratingRow: {
    display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16,
  },
  ratingMeta: {
    fontFamily: 'var(--font-body)', fontSize: 9.5, letterSpacing: '0.18em',
    color: '#A89080',
  },
  divider: {
    height: 1, background: '#DDD0C4', margin: '18px 0',
  },
  priceRow: {
    display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 16,
  },
  price: {
    fontFamily: 'var(--font-display)', fontSize: 38, fontWeight: 400,
    color: '#2C2520', letterSpacing: '0.01em', lineHeight: 1,
  },
  priceMeta: {
    fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.2em',
    color: '#A89080',
  },
  requestPrice: {
    fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500,
    color: '#2C2520', fontStyle: 'italic',
  },
  bodyDesc: {
    fontFamily: 'var(--font-display)', fontSize: 14.5, lineHeight: 1.6,
    color: '#6B5E58', margin: '0 0 20px',
  },
  shadesWrap: { marginBottom: 20 },
  shadesLabel: {
    fontFamily: 'var(--font-body)', fontSize: 9.5, fontWeight: 500,
    letterSpacing: '0.28em', color: '#A89080', marginBottom: 10,
  },
  swatches: { display: 'flex', gap: 10 },
  swatch: {
    width: 26, height: 26, borderRadius: '50%',
    border: '1.5px solid rgba(44,37,32,0.15)',
    cursor: 'pointer', padding: 0, flexShrink: 0,
  },
  ctaRow: {
    display: 'flex', gap: 10, marginBottom: 18,
  },
  qtyWrap: {
    display: 'flex', alignItems: 'center',
    border: '1px solid #DDD0C4',
  },
  qtyBtn: {
    background: 'none', border: 0,
    padding: '12px 16px', cursor: 'pointer',
    fontFamily: 'var(--font-body)', fontSize: 16, color: '#2C2520',
  },
  qtyNum: {
    fontFamily: 'var(--font-body)', fontSize: 13,
    color: '#2C2520', minWidth: 24, textAlign: 'center',
  },
  cta: {
    flex: 1, padding: '14px 0',
    background: '#2C2520', color: '#FDFAF7', border: 0,
    fontFamily: 'var(--font-body)', fontSize: 10.5, fontWeight: 600,
    letterSpacing: '0.3em', cursor: 'pointer',
  },
  shippingBox: {
    background: '#2C2520', color: '#FDFAF7',
    padding: '16px 18px', marginBottom: 20,
  },
  shippingTitle: {
    fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 500,
    marginBottom: 4, color: '#FDFAF7',
  },
  shippingSub: {
    fontFamily: 'var(--font-body)', fontSize: 9, letterSpacing: '0.18em',
    color: '#A89080', lineHeight: 1.6,
  },
  featureRow: {
    display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
    gap: 12, marginBottom: 20,
  },
  featureItem: {
    display: 'flex', flexDirection: 'column', gap: 4,
  },
  featureIcon: {
    fontSize: 14, color: '#B8935A', marginBottom: 4,
  },
  featureLabel: {
    fontFamily: 'var(--font-display)', fontSize: 13, color: '#2C2520',
  },
  featureSub: {
    fontFamily: 'var(--font-body)', fontSize: 9, letterSpacing: '0.22em',
    color: '#A89080', textTransform: 'uppercase',
  },
  accordionBtn: {
    background: 'none', border: 0, padding: '14px 0',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    width: '100%', cursor: 'pointer', borderTop: '1px solid #DDD0C4',
  },
  accordionLabel: {
    fontFamily: 'var(--font-display)', fontSize: 16, color: '#2C2520',
    fontWeight: 400,
  },
  accordionBody: { paddingBottom: 16 },
  accordionText: {
    fontFamily: 'var(--font-display)', fontSize: 14, lineHeight: 1.6,
    color: '#6B5E58', margin: 0,
  },
}
