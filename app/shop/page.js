import ProductGrid from '@/components/ProductGrid'
import LuxKitBanner from '@/components/LuxKitBanner'

export const metadata = {
  title: 'Shop — Makeup Hub',
}

export default async function ShopPage({ searchParams }) {
  const params = await searchParams
  const category = params?.category

  return (
    <div style={{ background: '#FAF7F4', paddingTop: 8 }}>
      <LuxKitBanner />
      <ProductGrid initialCategory={category} />
    </div>
  )
}
