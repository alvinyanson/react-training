import Navbar from '@/components/navbar'
import { useCartActions, useCartItems } from '@/stores/cart.store'
import { act, render, renderHook, screen } from '@testing-library/react'
import { mockProduct } from '../mocks/product'

vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => vi.fn(),
  Link: vi.fn(({ children }) => <form>{children}</form>),
}))

describe('Navbar component', () => {
  it('renders the navigation component with heading and links', async () => {
    render(<Navbar />)

    const brandName = screen.getByText(/shopping app/i)
    const toggleNavigation = screen.getByLabelText(/toggle navigation/i)
    const homeLink = screen.getByText(/home/i)
    const cartLink = screen.getByText(/cart/i)

    expect(brandName).toBeInTheDocument()
    expect(toggleNavigation).toBeInTheDocument()
    expect(homeLink).toBeInTheDocument()
    expect(cartLink).toBeInTheDocument()
  })

  it('should show 1 in cart if product is added', () => {
    const { result } = renderHook(() => useCartActions())
    const cart = renderHook(() => useCartItems())

    act(() => result.current.addToCart(mockProduct))

    expect(cart.result.current.length).toBe(1)
  })
})
