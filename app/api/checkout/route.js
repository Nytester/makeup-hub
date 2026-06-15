import { NextResponse } from 'next/server'

const SQUARE_API = 'https://connect.squareup.com/v2'

// Square catalog variation IDs — add more here as products go live in Square
const SQUARE_VARIATION_IDS = {
  'ap-lux-kit': '5L7O5O7DFQH2URBGGIEIOJLI',
}

export async function POST(request) {
  try {
    const { items } = await request.json()

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }

    const lineItems = items.map(item => {
      const variationId = SQUARE_VARIATION_IDS[item.id]

      if (variationId) {
        // Use Square catalog item — price and name come from Square automatically
        return {
          quantity: String(item.qty),
          catalog_object_id: variationId,
        }
      }

      // Fallback for items not yet in Square catalog
      return {
        name: item.name,
        quantity: String(item.qty),
        base_price_money: {
          amount: Math.round(item.price * 100),
          currency: 'USD',
        },
      }
    })

    const idempotencyKey = `order-${Date.now()}-${Math.random().toString(36).slice(2)}`

    const response = await fetch(`${SQUARE_API}/online-checkout/payment-links`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
        'Square-Version': '2024-01-18',
      },
      body: JSON.stringify({
        idempotency_key: idempotencyKey,
        order: {
          location_id: process.env.SQUARE_LOCATION_ID,
          line_items: lineItems,
        },
        checkout_options: {
          redirect_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/cart?success=true`,
          ask_for_shipping_address: true,
        },
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Square error:', JSON.stringify(data.errors))
      return NextResponse.json(
        { error: data.errors?.[0]?.detail || 'Square checkout failed' },
        { status: response.status }
      )
    }

    return NextResponse.json({ url: data.payment_link.url })
  } catch (err) {
    console.error('Checkout error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
