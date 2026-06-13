'use client'
import { useState } from 'react'
import ProductCard from './ProductCard'
import FeaturedCard from './FeaturedCard'
import { PRODUCTS, FILTERS } from '@/data/products'

export default function ProductGrid({ initialCategory }) {
  const initial = initialCategory
    ? FILTERS.find(f => f.toLowerCase() === initialCategory.toLowerCase()) || 'All'
    : 'All'
  const [activeFilter, setActiveFilter] = useState(initial)

  const filtered = activeFilter === 'All'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeFilter.toLowerCase())

  return (
    <section style={s.section}>
      <div style={s.header}>
        <div>
          <p style={s.eyebrow}>The edit</p>
          <h2 style={s.title}>Featured Products & Bundles</h2>
        </div>
        <div style={s.filters}>
          {FILTERS.map(f => (
            <button
              key={f}
              style={{
                ...s.filterPill,
                background: activeFilter === f ? '#2C2520' : 'transparent',
                color: activeFilter === f ? '#FDFAF7' : '#2C2520',
                borderColor: activeFilter === f ? '#2C2520' : '#DDD0C4',
              }}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <p style={s.count}>Curated products — full catalog available by request</p>

      {activeFilter === 'Featured Items' ? (
        <div>
          {filtered.length === 0 ? (
            <p style={s.empty}>Featured items coming soon.</p>
          ) : (
            filtered.map((product, i) => (
              <FeaturedCard key={product.id} product={product} index={i} />
            ))
          )}
        </div>
      ) : (
        <div style={s.grid}>
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  )
}

const s = {
  section: { padding: '64px 64px 80px', background: '#FAF7F4' },
  header: {
    display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
    marginBottom: 12, flexWrap: 'wrap', gap: 16,
  },
  eyebrow: {
    fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 500,
    letterSpacing: '0.14em', textTransform: 'uppercase', color: '#A89080', marginBottom: 8,
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 400, color: '#2C2520', lineHeight: 1.1,
  },
  filters: { display: 'flex', gap: 8, flexWrap: 'wrap' },
  filterPill: {
    fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 500,
    border: '1px solid', borderRadius: 9999, padding: '6px 16px',
    cursor: 'pointer', transition: 'all 150ms ease', letterSpacing: '0.01em',
  },
  count: { fontFamily: 'var(--font-body)', fontSize: 12, color: '#A89080', marginBottom: 24 },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: 20,
  },
  empty: {
    fontFamily: 'var(--font-display)', fontStyle: 'italic',
    fontSize: 16, color: '#A89080', textAlign: 'center', padding: '48px 0',
  },
}
