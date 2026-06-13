import Hero from '@/components/Hero'
import CategoryStrip from '@/components/CategoryStrip'
import TikTokStrip from '@/components/TikTokStrip'
import ProductGrid from '@/components/ProductGrid'
import EditorialBanner from '@/components/EditorialBanner'

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryStrip />
      <TikTokStrip />
      <ProductGrid />
      <EditorialBanner />
    </>
  )
}
