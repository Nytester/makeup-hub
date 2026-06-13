import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata = {
  title: 'Makeup Hub',
  description: 'Professional Makeup Shop & Studio — shop online or visit us in store.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
