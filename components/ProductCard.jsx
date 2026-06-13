'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false)
  const [wishlisted, setWishlisted] = useState(false)
  const [activeShade, setActiveShade] = useState(0)
  const [imgError, setImgError] = useState(false)
  const router = useRouter()

  const showImage = product.image && !imgError

  const isSoldOut = product.status === 'sold-out'

  const BADGE = {
    'new':         { bg: '#2C2520', label: 'New' },
    'sale':        { bg: '#C01818', label: 'Sale' },
    'preorder':    { bg: '#6E1A1A', label: 'Preorder' },
    'featured':    { bg: '#C01818', label: 'Featured' },
    'luxury':      { bg: '#4A1010', label: 'Luxury Pick' },
    'best-seller': { bg: '#2C2520', label: 'Best Seller' },
    'bundle':      { bg: '#6B5E58', label: 'Bundle' },
  }
  const badgeCfg = product.badge ? BADGE[product.badge] : null

  return (
    <div
      style={{
        ...s.card,
        boxShadow: hovered ? '0 4px 20px rgba(44,37,32,0.10)' : '0 2px 8px rgba(44,37,32,0.06)',
        cursor: isSoldOut ? 'default' : 'pointer',
        opacity: isSoldOut ? 0.7 : 1,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => !isSoldOut && router.push(`/product/${product.id}`)}
    >
      <div style={s.imgWrap}>
        <div style={{
          ...s.imgPlaceholder,
          background: product.imgBg || '#F0EAE3',
          transform: hovered && !isSoldOut ? 'scale(1.03)' : 'scale(1)',
          transition: 'transform 400ms ease',
        }}>
          {showImage ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              style={{ objectFit: 'cover' }}
              onError={() => setImgError(true)}
            />
          ) : (
            <svg width={40} height={40} viewBox="0 0 24 24" fill="none" stroke="#C4B4A6" strokeWidth={0.8}>
              <rect x={3} y={3} width={18} height={18} rx={2} />
              <path d="M3 9l4-4 4 4 4-4 4 4" />
              <circle cx={8.5} cy={13.5} r={1.5} />
            </svg>
          )}
        </div>

        {(isSoldOut || badgeCfg) && (
          <div style={{
            ...s.badge,
            background: isSoldOut ? '#A89080' : badgeCfg.bg,
          }}>
            {isSoldOut ? 'Sold out' : badgeCfg.label}
          </div>
        )}

        {!isSoldOut && (
          <button
            style={s.wishlistBtn}
            onClick={e => { e.stopPropagation(); setWishlisted(!wishlisted) }}
          >
            <svg width={14} height={14} viewBox="0 0 24 24" fill={wishlisted ? '#B8726E' : 'none'} stroke={wishlisted ? '#B8726E' : '#A89080'} strokeWidth={1.5} strokeLinecap="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        )}
      </div>

      <div style={s.body}>
        <div style={s.brand}>Makeup Hub</div>
        <div style={s.name}>{product.name}</div>
        <div style={s.desc}>{product.desc}</div>

        {product.shades && product.shades.length > 0 && (
          <div style={s.swatches}>
            {product.shades.slice(0, 5).map((color, i) => (
              <div
                key={i}
                style={{
                  ...s.swatch,
                  background: color,
                  outline: activeShade === i ? '1.5px solid #2C2520' : 'none',
                  outlineOffset: 2,
                }}
                onClick={e => { e.stopPropagation(); setActiveShade(i) }}
              />
            ))}
            {product.shades.length > 5 && (
              <div style={s.moreShades}>+{product.shades.length - 5}</div>
            )}
          </div>
        )}

        <div style={s.footer}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
            {product.price != null ? (
              <>
                <span style={s.price}>${product.price}</span>
                {product.originalPrice && (
                  <span style={s.oldPrice}>${product.originalPrice}</span>
                )}
              </>
            ) : (
              <span style={s.requestPrice}>Request Pricing</span>
            )}
          </div>
          {product.rating && (
            <div style={{ display: 'flex', gap: 2 }}>
              {[1,2,3,4,5].map(i => (
                <svg key={i} width={10} height={10} viewBox="0 0 24 24" fill={i <= Math.round(product.rating) ? '#C4614A' : '#DDD0C4'} stroke="none">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const s = {
  card: {
    background: '#FDFAF7', border: '1px solid #DDD0C4',
    borderRadius: 4, overflow: 'hidden',
    transition: 'box-shadow 200ms ease',
    display: 'flex', flexDirection: 'column',
  },
  imgWrap: { position: 'relative', overflow: 'hidden', aspectRatio: '3 / 4', background: '#F0EAE3' },
  imgPlaceholder: { width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  badge: {
    position: 'absolute', top: 10, left: 10,
    color: '#FDFAF7', fontFamily: 'var(--font-body)',
    fontSize: 9, fontWeight: 500, letterSpacing: '0.12em',
    textTransform: 'uppercase', padding: '3px 8px', borderRadius: 2,
  },
  wishlistBtn: {
    position: 'absolute', top: 10, right: 10,
    width: 28, height: 28, borderRadius: '50%',
    background: 'rgba(253,250,247,0.85)', border: 'none',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer',
  },
  body: { padding: '12px 14px 16px', flex: 1, display: 'flex', flexDirection: 'column' },
  brand: {
    fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 500,
    letterSpacing: '0.12em', textTransform: 'uppercase', color: '#A89080', marginBottom: 4,
  },
  name: {
    fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 400,
    color: '#2C2520', lineHeight: 1.2, marginBottom: 4,
  },
  desc: { fontFamily: 'var(--font-body)', fontSize: 11, color: '#6B5E58', lineHeight: 1.5, marginBottom: 8, flex: 1 },
  swatches: { display: 'flex', gap: 4, marginBottom: 10, alignItems: 'center' },
  swatch: {
    width: 14, height: 14, borderRadius: '50%',
    border: '1.5px solid rgba(44,37,32,0.1)', cursor: 'pointer',
    flexShrink: 0,
  },
  moreShades: { fontFamily: 'var(--font-body)', fontSize: 10, color: '#A89080' },
  footer: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  price: { fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500, color: '#2C2520' },
  oldPrice: { fontFamily: 'var(--font-body)', fontSize: 12, color: '#A89080', textDecoration: 'line-through' },
  requestPrice: { fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 500, color: '#C01818', letterSpacing: '0.04em', fontStyle: 'italic' },
}
