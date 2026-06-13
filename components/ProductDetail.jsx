'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useCart } from '@/context/CartContext'

const SHADE_NAMES = ['01 Ivory Nude', '02 Warm Blush', '03 Terracotta Rose', '04 Berry Kiss', '05 Deep Plum']

export default function ProductDetail({ product }) {
  const [selectedShade, setSelectedShade] = useState(0)
  const [qty, setQty] = useState(1)
  const [activeTab, setActiveTab] = useState('details')
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()
  const router = useRouter()

  const shades = product.shades?.length > 0
    ? product.shades.slice(0, 5)
    : ['#E8B4AD','#C4614A','#B8726E','#6B2D3E','#2C2520']

  const handleAdd = () => {
    addItem(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div style={s.page}>
      <div style={s.breadcrumb}>
        <span style={{ cursor: 'pointer', color: '#A89080' }} onClick={() => router.back()}>← Back</span>
        <span style={{ color: '#DDD0C4', margin: '0 8px' }}>/</span>
        <span style={{ color: '#6B5E58' }}>{product.name}</span>
      </div>

      <div style={s.layout}>
        <div style={s.images}>
          <div style={s.mainImg}>
            <div style={s.imgPlaceholder}>
              <div style={{ textAlign: 'center' }}>
                <svg width={64} height={64} viewBox="0 0 24 24" fill="none" stroke="#C4B4A6" strokeWidth={0.7}>
                  <rect x={3} y={3} width={18} height={18} rx={2} />
                  <path d="M3 9l4-4 4 4 4-4 4 4" />
                  <circle cx={8.5} cy={13.5} r={1.5} />
                </svg>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: '#A89080', marginTop: 8 }}>
                  Product photography
                </div>
              </div>
            </div>
          </div>
          <div style={s.thumbStrip}>
            {[1,2,3,4].map(i => (
              <div key={i} style={{ ...s.thumb, border: i === 1 ? '1.5px solid #2C2520' : '1px solid #DDD0C4' }}>
                <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#DDD0C4" strokeWidth={1}>
                  <rect x={3} y={3} width={18} height={18} rx={2} />
                </svg>
              </div>
            ))}
          </div>
        </div>

        <div style={s.info}>
          <p style={s.brand}>Makeup Hub</p>
          <h1 style={s.name}>{product.name}</h1>
          <p style={s.tagline}>{product.desc}</p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <div style={{ display: 'flex', gap: 2 }}>
              {[1,2,3,4,5].map(i => (
                <svg key={i} width={13} height={13} viewBox="0 0 24 24" fill={i <= 4 ? '#C4614A' : '#DDD0C4'} stroke="none">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#6B5E58' }}>
              {product.rating || '4.5'} (248 reviews)
            </span>
          </div>

          <div style={{ marginBottom: 24 }}>
            <span style={s.price}>${product.price}</span>
            {product.originalPrice && (
              <span style={s.oldPrice}> ${product.originalPrice}</span>
            )}
          </div>

          <div style={s.divider} />

          <div style={{ marginBottom: 24 }}>
            <p style={s.sectionLabel}>
              Shade: <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0, color: '#2C2520' }}>
                {SHADE_NAMES[selectedShade] || SHADE_NAMES[0]}
              </span>
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {shades.map((color, i) => (
                <button
                  key={i}
                  title={SHADE_NAMES[i]}
                  onClick={() => setSelectedShade(i)}
                  style={{
                    width: 28, height: 28, borderRadius: '50%', background: color,
                    border: 'none', cursor: 'pointer',
                    outline: selectedShade === i ? '2px solid #2C2520' : '1.5px solid rgba(44,37,32,0.1)',
                    outlineOffset: 3, transition: 'outline 100ms ease',
                  }}
                />
              ))}
            </div>
          </div>

          <div style={s.buyRow}>
            <div style={s.qtyControl}>
              <button style={s.qtyBtn} onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
              <span style={s.qtyNum}>{qty}</span>
              <button style={s.qtyBtn} onClick={() => setQty(q => q + 1)}>+</button>
            </div>
            <button
              style={{ ...s.addBtn, background: added ? '#A24F3B' : '#C4614A' }}
              onClick={handleAdd}
            >
              {added ? '✓ Added to bag' : 'Add to bag'}
            </button>
          </div>

          <div style={{ marginTop: 36 }}>
            <div style={s.tabs}>
              {['details', 'ingredients', 'how to use'].map(tab => (
                <button
                  key={tab}
                  style={{
                    ...s.tab,
                    borderBottom: activeTab === tab ? '2px solid #2C2520' : '2px solid transparent',
                    color: activeTab === tab ? '#2C2520' : '#A89080',
                  }}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
            <div style={{ paddingTop: 4 }}>
              {activeTab === 'details' && (
                <p style={s.tabText}>A long-wear formula that feels as light as air. Blends seamlessly into skin for a natural, perfected finish that lasts all day without settling into fine lines or creasing. Suitable for all skin types.</p>
              )}
              {activeTab === 'ingredients' && (
                <p style={s.tabText}>Dimethicone, Cyclopentasiloxane, Trimethylsiloxysilicate, Isododecane, Titanium Dioxide CI 77891. Fragrance-free. Dermatologist tested. Cruelty-free.</p>
              )}
              {activeTab === 'how to use' && (
                <p style={s.tabText}>Apply directly to lips starting from the centre and blending outward. Build up coverage for a more intense result. For best results, blot and reapply for long-lasting wear.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const s = {
  page: { background: '#FAF7F4', padding: '20px 64px 80px', minHeight: '80vh' },
  breadcrumb: { fontFamily: 'var(--font-body)', fontSize: 12, color: '#6B5E58', marginBottom: 32, display: 'flex', alignItems: 'center' },
  layout: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' },
  images: { display: 'flex', flexDirection: 'column', gap: 12 },
  mainImg: { borderRadius: 4, overflow: 'hidden', border: '1px solid #DDD0C4' },
  imgPlaceholder: { aspectRatio: '3/4', background: '#F0EAE3', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  thumbStrip: { display: 'flex', gap: 8 },
  thumb: { width: 60, height: 60, borderRadius: 4, background: '#F0EAE3', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
  info: { paddingTop: 8 },
  brand: { fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#A89080', marginBottom: 8 },
  name: { fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 400, color: '#2C2520', lineHeight: 1.1, marginBottom: 8 },
  tagline: { fontFamily: 'var(--font-body)', fontSize: 14, color: '#6B5E58', marginBottom: 16 },
  price: { fontFamily: 'var(--font-body)', fontSize: 20, fontWeight: 500, color: '#2C2520' },
  oldPrice: { fontFamily: 'var(--font-body)', fontSize: 14, color: '#A89080', textDecoration: 'line-through' },
  divider: { height: 1, background: '#DDD0C4', margin: '0 0 24px' },
  sectionLabel: { fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#A89080', marginBottom: 12 },
  buyRow: { display: 'flex', gap: 12, alignItems: 'center' },
  qtyControl: { display: 'flex', alignItems: 'center', border: '1px solid #DDD0C4', borderRadius: 2 },
  qtyBtn: { width: 36, height: 44, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 16, color: '#2C2520', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  qtyNum: { fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500, color: '#2C2520', width: 36, textAlign: 'center' },
  addBtn: { flex: 1, height: 44, border: 'none', borderRadius: 2, cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500, color: '#FDFAF7', letterSpacing: '0.01em', transition: 'background 200ms ease' },
  tabs: { display: 'flex', borderBottom: '1px solid #DDD0C4', marginBottom: 16 },
  tab: { fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', padding: '8px 16px 10px', letterSpacing: '0.04em', transition: 'all 150ms ease' },
  tabText: { fontFamily: 'var(--font-body)', fontSize: 13, color: '#4A3F3A', lineHeight: 1.7, maxWidth: 480 },
}
