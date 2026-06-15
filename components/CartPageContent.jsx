'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'

export default function CartPageContent() {
  const { items, removeItem, total } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const router = useRouter()
  const shipping = total >= 50 ? 0 : 6
  const orderTotal = total + shipping

  const handleCheckout = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Checkout failed')
      window.location.href = data.url
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  if (items.length === 0) return (
    <div style={{ padding: '80px 64px', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 400, color: '#2C2520', marginBottom: 12 }}>Your bag is empty</h2>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#6B5E58', marginBottom: 28 }}>{"Looks like you haven't added anything yet."}</p>
      <Link href="/shop" style={{ background: '#C4614A', color: '#FDFAF7', borderRadius: 2, padding: '13px 32px', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500, textDecoration: 'none' }}>Start shopping</Link>
    </div>
  )

  return (
    <div className="cart-page" style={{ padding: '40px 64px 80px', background: '#FAF7F4', minHeight: '70vh' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 400, color: '#2C2520', marginBottom: 8 }}>Your bag</h1>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#A89080', marginBottom: 32 }}>{items.length} item{items.length !== 1 ? 's' : ''}</p>

      <div className="cart-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 48, alignItems: 'start' }}>

        {/* Items list */}
        <div>
          {items.map(item => (
            <div key={item.id} style={{ display: 'flex', gap: 20, padding: '20px 0', borderBottom: '1px solid #DDD0C4' }}>
              <div style={{ width: 80, height: 80, background: item.imgBg || '#F0EAE3', borderRadius: 4, flexShrink: 0, border: '1px solid #DDD0C4', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {item.image
                  ? <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="#C4B4A6" strokeWidth={1}><rect x={3} y={3} width={18} height={18} rx={2} /></svg>
                }
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#A89080', marginBottom: 3 }}>Makeup Hub</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: '#2C2520', marginBottom: 4 }}>{item.name}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#6B5E58', marginBottom: 12 }}>{item.desc}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500, color: '#2C2520' }}>${item.price} × {item.qty}</span>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 11, color: '#A89080', textDecoration: 'underline', padding: 0 }} onClick={() => removeItem(item.id)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div style={{ background: '#FDFAF7', border: '1px solid #DDD0C4', borderRadius: 4, padding: '28px 24px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 400, color: '#2C2520', marginBottom: 20 }}>Order summary</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#6B5E58' }}>Subtotal</span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#2C2520' }}>${total.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#6B5E58' }}>Shipping</span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: shipping === 0 ? '#6B2D3E' : '#2C2520' }}>{shipping === 0 ? 'Free' : '$6.00'}</span>
          </div>
          <div style={{ height: 1, background: '#DDD0C4', margin: '16px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500, color: '#2C2520' }}>Total</span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500, color: '#2C2520' }}>${orderTotal.toFixed(2)}</span>
          </div>

          {error && (
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#C01818', marginBottom: 12, textAlign: 'center' }}>{error}</p>
          )}

          <button
            onClick={handleCheckout}
            disabled={loading}
            style={{ width: '100%', background: loading ? '#A89080' : '#3D1F0A', color: '#FDFAF7', border: 'none', borderRadius: 2, padding: 14, fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, letterSpacing: '0.12em', cursor: loading ? 'not-allowed' : 'pointer', marginBottom: 10, transition: 'background 200ms ease' }}
          >
            {loading ? 'Redirecting to Square…' : 'Checkout with Square →'}
          </button>

          <Link href="/shop" style={{ display: 'block', textAlign: 'center', color: '#2C2520', border: '1.5px solid #2C2520', borderRadius: 2, padding: 12, fontFamily: 'var(--font-body)', fontSize: 13, textDecoration: 'none' }}>Continue shopping</Link>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: '#A89080', textAlign: 'center', marginTop: 14 }}>Secure checkout powered by Square</p>
        </div>

      </div>
    </div>
  )
}
