'use client'
import { useState } from 'react'

const CATEGORIES = ['Lips', 'Face', 'Eyes', 'Skincare', 'Mixed / Bundles']

export default function WholesalePage() {
  const [form, setForm] = useState({
    fullName: '', businessName: '', email: '', phone: '',
    categories: [], quantity: '', notes: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const toggleCategory = (cat) => {
    set('categories', form.categories.includes(cat)
      ? form.categories.filter(c => c !== cat)
      : [...form.categories, cat]
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div style={s.page}>
        <div style={s.successWrap}>
          <div style={s.successIcon}>✓</div>
          <h2 style={s.successTitle}>Inquiry received</h2>
          <p style={s.successText}>
            Thank you, {form.fullName || 'there'}. We'll be in touch within 2 business days to discuss your wholesale order.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div style={s.page}>
      <div style={s.inner}>
        <div style={s.heroSection}>
          <p style={s.eyebrow}>For businesses & resellers</p>
          <h1 style={s.headline}>Wholesale Orders</h1>
          <p style={s.sub}>Bulk beauty product inquiries and preorder requests.</p>
        </div>

        <div style={s.layout}>
          <div style={s.sidebar}>
            <div style={s.infoBlock}>
              <p style={s.infoLabel}>Minimum order</p>
              <p style={s.infoValue}>Available upon inquiry</p>
            </div>
            <div style={s.infoBlock}>
              <p style={s.infoLabel}>Turnaround</p>
              <p style={s.infoValue}>2–4 weeks depending on quantity</p>
            </div>
            <div style={s.infoBlock}>
              <p style={s.infoLabel}>Contact</p>
              <p style={s.infoValue}>hello@annpaulbeauty.com</p>
            </div>
            <div style={s.infoBlock}>
              <p style={s.infoLabel}>Response time</p>
              <p style={s.infoValue}>Within 2 business days</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} style={s.form}>
            <div style={s.row} className="wholesale-row">
              <div style={s.field}>
                <label style={s.label}>Full Name *</label>
                <input
                  required
                  type="text"
                  value={form.fullName}
                  onChange={e => set('fullName', e.target.value)}
                  style={s.input}
                  placeholder="Jane Smith"
                />
              </div>
              <div style={s.field}>
                <label style={s.label}>Business Name *</label>
                <input
                  required
                  type="text"
                  value={form.businessName}
                  onChange={e => set('businessName', e.target.value)}
                  style={s.input}
                  placeholder="Beauty Co."
                />
              </div>
            </div>

            <div style={s.row} className="wholesale-row">
              <div style={s.field}>
                <label style={s.label}>Email *</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={e => set('email', e.target.value)}
                  style={s.input}
                  placeholder="jane@business.com"
                />
              </div>
              <div style={s.field}>
                <label style={s.label}>Phone Number</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => set('phone', e.target.value)}
                  style={s.input}
                  placeholder="+1 (000) 000-0000"
                />
              </div>
            </div>

            <div style={s.fieldFull}>
              <label style={s.label}>Interested Product Categories</label>
              <div style={s.catGrid}>
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => toggleCategory(cat)}
                    style={{
                      ...s.catPill,
                      background: form.categories.includes(cat) ? '#C01818' : 'transparent',
                      color: form.categories.includes(cat) ? '#FDFAF7' : '#2C2520',
                      borderColor: form.categories.includes(cat) ? '#C01818' : '#DDD0C4',
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div style={s.fieldFull}>
              <label style={s.label}>Estimated Quantity</label>
              <input
                type="text"
                value={form.quantity}
                onChange={e => set('quantity', e.target.value)}
                style={s.input}
                placeholder="e.g. 50 units, 200 pieces, bulk pallet"
              />
            </div>

            <div style={s.fieldFull}>
              <label style={s.label}>Notes / Special Requests</label>
              <textarea
                value={form.notes}
                onChange={e => set('notes', e.target.value)}
                style={s.textarea}
                placeholder="Tell us about your business, specific products you're interested in, or any special requirements."
                rows={5}
              />
            </div>

            <button type="submit" style={s.submitBtn}>Submit Inquiry</button>
          </form>
        </div>
      </div>
    </div>
  )
}

const s = {
  page: { background: '#FAF7F4', minHeight: '80vh', padding: '48px 64px 96px' },
  inner: { maxWidth: 1100, margin: '0 auto' },
  heroSection: { marginBottom: 56 },
  eyebrow: {
    fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 500,
    letterSpacing: '0.14em', textTransform: 'uppercase', color: '#A89080', marginBottom: 12,
  },
  headline: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 300,
    color: '#2C2520', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 16,
  },
  sub: {
    fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.7,
    color: '#4A3F3A', maxWidth: 480,
  },
  layout: { display: 'grid', gridTemplateColumns: '220px 1fr', gap: 64, alignItems: 'start' },
  sidebar: { display: 'flex', flexDirection: 'column', gap: 28 },
  infoBlock: {},
  infoLabel: {
    fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 500,
    letterSpacing: '0.14em', textTransform: 'uppercase', color: '#A89080', marginBottom: 6,
  },
  infoValue: { fontFamily: 'var(--font-body)', fontSize: 13, color: '#4A3F3A', lineHeight: 1.6 },
  form: { display: 'flex', flexDirection: 'column', gap: 24 },
  row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 },
  field: { display: 'flex', flexDirection: 'column', gap: 8 },
  fieldFull: { display: 'flex', flexDirection: 'column', gap: 8 },
  label: {
    fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 500,
    letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6B5E58',
  },
  input: {
    fontFamily: 'var(--font-body)', fontSize: 14, color: '#2C2520',
    background: '#FDFAF7', border: '1px solid #DDD0C4', borderRadius: 2,
    padding: '12px 14px', outline: 'none', width: '100%',
    boxSizing: 'border-box', transition: 'border-color 150ms ease',
  },
  textarea: {
    fontFamily: 'var(--font-body)', fontSize: 14, color: '#2C2520',
    background: '#FDFAF7', border: '1px solid #DDD0C4', borderRadius: 2,
    padding: '12px 14px', outline: 'none', width: '100%',
    boxSizing: 'border-box', resize: 'vertical', lineHeight: 1.6,
  },
  catGrid: { display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 4 },
  catPill: {
    fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 500,
    border: '1px solid', borderRadius: 9999, padding: '7px 18px',
    cursor: 'pointer', transition: 'all 150ms ease', letterSpacing: '0.01em',
  },
  submitBtn: {
    alignSelf: 'flex-start',
    background: '#C01818', color: '#FDFAF7', border: 'none', borderRadius: 2,
    fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500,
    letterSpacing: '0.01em', padding: '14px 36px', cursor: 'pointer',
    transition: 'background 150ms ease',
  },
  successWrap: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    justifyContent: 'center', minHeight: '60vh', textAlign: 'center', gap: 16,
  },
  successIcon: {
    width: 56, height: 56, borderRadius: '50%',
    background: '#C01818', color: '#FDFAF7',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 24, fontWeight: 300,
  },
  successTitle: {
    fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 300,
    color: '#2C2520', letterSpacing: '-0.01em',
  },
  successText: {
    fontFamily: 'var(--font-body)', fontSize: 15, color: '#4A3F3A',
    lineHeight: 1.7, maxWidth: 420,
  },
}
