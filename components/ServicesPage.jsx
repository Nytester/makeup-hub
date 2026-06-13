'use client'
import Link from 'next/link'
import { useState } from 'react'
import { SERVICES } from '@/data/products'

const TIMES = ['10:00 am','11:00 am','12:00 pm','1:00 pm','2:00 pm','3:00 pm','4:00 pm','5:00 pm']

export default function ServicesPage() {
  const [selected, setSelected] = useState(null)
  const [step, setStep] = useState(1)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [booked, setBooked] = useState(false)

  const labelStyle = { fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#A89080' }
  const inputStyle = { fontFamily: 'var(--font-body)', fontSize: 14, color: '#2C2520', background: '#FDFAF7', border: '1px solid #DDD0C4', borderRadius: 4, padding: '10px 14px', outline: 'none', width: '100%' }

  if (booked) return (
    <div style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#FAF7F4', padding: '80px 64px', textAlign: 'center' }}>
      <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#F0EAE3', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#B8726E" strokeWidth={2} strokeLinecap="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 400, color: '#2C2520', marginBottom: 12 }}>{"You're booked!"}</h2>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#6B5E58', maxWidth: 400, lineHeight: 1.7, marginBottom: 8 }}>
        {selected.name} on {date} at {time}. {"We've sent a confirmation to"} {email}.
      </p>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#A89080', marginBottom: 32 }}>{"We can't wait to see you at Makeup Hub."}</p>
      <Link href="/" style={{ background: '#C4614A', color: '#FDFAF7', borderRadius: 2, padding: '13px 32px', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500, textDecoration: 'none' }}>Back to home</Link>
    </div>
  )

  return (
    <div style={{ background: '#FAF7F4', padding: '48px 64px 80px', minHeight: '80vh' }}>
      <div style={{ marginBottom: 48 }}>
        <p style={{ ...labelStyle, marginBottom: 12 }}>In-store studio</p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,4vw,52px)', fontWeight: 400, color: '#2C2520', lineHeight: 1.1, marginBottom: 8 }}>Book a service</h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: '#6B5E58', maxWidth: 480, lineHeight: 1.7 }}>
          Our professional makeup artists are ready for you. Choose your service, pick a time, and come in.
        </p>
      </div>

      <div style={{ display: 'flex', gap: 0, marginBottom: 40, borderBottom: '1px solid #DDD0C4' }}>
        {['Choose service', 'Pick a time', 'Confirm'].map((label, i) => (
          <div key={label} style={{ padding: '0 24px 12px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: step > i ? '#2C2520' : step === i + 1 ? '#C4614A' : '#DDD0C4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 600, color: '#FDFAF7' }}>{step > i ? '✓' : i + 1}</span>
            </div>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: step === i + 1 ? '#2C2520' : '#A89080', fontWeight: step === i + 1 ? 500 : 400 }}>{label}</span>
          </div>
        ))}
      </div>

      {step === 1 && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {SERVICES.map(svc => (
              <div
                key={svc.id}
                onClick={() => setSelected(svc)}
                style={{ background: '#FDFAF7', border: `1.5px solid ${selected?.id === svc.id ? '#2C2520' : '#DDD0C4'}`, borderRadius: 4, padding: 24, cursor: 'pointer', boxShadow: selected?.id === svc.id ? '0 4px 20px rgba(44,37,32,0.10)' : '0 2px 8px rgba(44,37,32,0.04)', transition: 'all 150ms ease', position: 'relative' }}
              >
                {svc.tag && <div style={{ position: 'absolute', top: 16, right: 16, background: '#C4614A', color: '#FDFAF7', fontSize: 9, fontWeight: 500, letterSpacing: '0.10em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: 2 }}>{svc.tag}</div>}
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 400, color: '#2C2520', marginBottom: 4 }}>{svc.name}</div>
                <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: '#A89080' }}>{svc.duration}</span>
                  <span style={{ color: '#DDD0C4' }}>·</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 500, color: '#2C2520' }}>${svc.price}</span>
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#6B5E58', lineHeight: 1.6 }}>{svc.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 28 }}>
            <button
              disabled={!selected}
              onClick={() => setStep(2)}
              style={{ background: selected ? '#C4614A' : '#DDD0C4', color: '#FDFAF7', border: 'none', borderRadius: 2, padding: '13px 36px', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500, cursor: selected ? 'pointer' : 'not-allowed' }}
            >Continue →</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div style={{ maxWidth: 520 }}>
          <div style={{ background: '#F0EAE3', borderRadius: 4, padding: '16px 20px', marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: '#2C2520' }}>{selected.name}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#6B5E58' }}>{selected.duration} · ${selected.price}</div>
            </div>
            <button onClick={() => setStep(1)} style={{ background: 'none', border: 'none', fontFamily: 'var(--font-body)', fontSize: 11, color: '#A89080', textDecoration: 'underline', cursor: 'pointer' }}>Change</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <label style={{ ...labelStyle, display: 'block', marginBottom: 8 }}>Select date</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} style={inputStyle} min={new Date().toISOString().split('T')[0]} />
            </div>
            <div>
              <label style={{ ...labelStyle, display: 'block', marginBottom: 8 }}>Select time</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {TIMES.map(t => (
                  <button key={t} onClick={() => setTime(t)} style={{ fontFamily: 'var(--font-body)', fontSize: 12, padding: '8px 14px', borderRadius: 2, border: `1px solid ${time === t ? '#2C2520' : '#DDD0C4'}`, background: time === t ? '#2C2520' : '#FDFAF7', color: time === t ? '#FDFAF7' : '#2C2520', cursor: 'pointer' }}>{t}</button>
                ))}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 28, display: 'flex', gap: 12 }}>
            <button onClick={() => setStep(1)} style={{ background: 'transparent', border: '1.5px solid #DDD0C4', color: '#2C2520', borderRadius: 2, padding: '12px 24px', fontFamily: 'var(--font-body)', fontSize: 14, cursor: 'pointer' }}>← Back</button>
            <button disabled={!date || !time} onClick={() => setStep(3)} style={{ background: date && time ? '#C4614A' : '#DDD0C4', color: '#FDFAF7', border: 'none', borderRadius: 2, padding: '12px 36px', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500, cursor: date && time ? 'pointer' : 'not-allowed' }}>Continue →</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div style={{ maxWidth: 480 }}>
          <div style={{ background: '#F0EAE3', borderRadius: 4, padding: '20px 24px', marginBottom: 28 }}>
            <p style={{ ...labelStyle, marginBottom: 12 }}>Your booking</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[['Service', selected.name], ['Date', date], ['Time', time], ['Duration', selected.duration], ['Price', `$${selected.price}`]].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#6B5E58' }}>{k}</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500, color: '#2C2520' }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
            <div>
              <label style={{ ...labelStyle, display: 'block', marginBottom: 6 }}>Your name</label>
              <input type="text" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={{ ...labelStyle, display: 'block', marginBottom: 6 }}>Email address</label>
              <input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={() => setStep(2)} style={{ background: 'transparent', border: '1.5px solid #DDD0C4', color: '#2C2520', borderRadius: 2, padding: '12px 24px', fontFamily: 'var(--font-body)', fontSize: 14, cursor: 'pointer' }}>← Back</button>
            <button disabled={!name || !email} onClick={() => { if (name && email) setBooked(true) }} style={{ background: name && email ? '#C4614A' : '#DDD0C4', color: '#FDFAF7', border: 'none', borderRadius: 2, padding: '12px 36px', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500, cursor: name && email ? 'pointer' : 'not-allowed' }}>Confirm booking</button>
          </div>
        </div>
      )}
    </div>
  )
}
