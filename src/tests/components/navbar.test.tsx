import Navbar from '@/components/navbar'
import { render, screen } from '@testing-library/react'
import { create } from 'zustand'

const mockUseCartStore = create(() => ({
  cartItems: [{ id: 1, name: 'Product 1', quantity: 2 }],
  actions: {
    addToCart: vi.fn(),
    increaseQty: vi.fn(),
    decreaseQty: vi.fn(),
    removeFromCart: vi.fn(),
    checkout: vi.fn(),
  },
}))

describe('Navbar component', () => {
  beforeEach(() => {
    vi.mock('@/store/cartStore', () => ({
      useCartItems: () => mockUseCartStore.getState().cartItems,
      useCartActions: () => mockUseCartStore.getState().actions,
    }))
  })

  it('renders the navigation component with heading and links', () => {
    render(<Navbar />)

    screen.debug()

    // expect(screen.queryByText(/shopping app/i)).toBeInTheDocument()
  })
})
