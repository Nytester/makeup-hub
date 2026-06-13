import { PRODUCTS } from '@/data/products'
import ProductDetail from '@/components/ProductDetail'
import Link from 'next/link'

export async function generateMetadata({ params }) {
  const { id } = await params
  const product = PRODUCTS.find(p => p.id === parseInt(id))
  return { title: product ? `${product.name} — Makeup Hub` : 'Product — Makeup Hub' }
}

export default async function ProductPage({ params }) {
  const { id } = await params
  const product = PRODUCTS.find(p => p.id === parseInt(id))

  if (!product) {
    return (
      <div style={{ padding: '80px 64px', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: '#2C2520', marginBottom: 16 }}>Product not found</h2>
        <Link href="/shop" style={{ background: '#C4614A', color: '#FDFAF7', borderRadius: 2, padding: '13px 32px', fontSize: 14, fontWeight: 500 }}>Browse all products</Link>
      </div>
    )
  }

  return <ProductDetail product={product} />
}
