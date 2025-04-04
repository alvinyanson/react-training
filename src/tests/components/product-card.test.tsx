import ProductCard from '@/components/product-card'
import { useCartItems } from '@/stores/cart.store'
import { mockProduct } from '@/tests/mocks/product'
import { formatNumberWithCommas } from '@/util'
import { useNavigate } from '@tanstack/react-router'
import { act, render, renderHook, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

vi.mock('@tanstack/react-router', async () => {
  const actual = await vi.importActual('@tanstack/react-router')
  return {
    ...actual,
    useNavigate: vi.fn(),
  }
})

describe('Product Card component', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useCartItems())

    // Reset the state
    act(() => {
      result.current = []
    })
  })

  it('should render the product info', () => {
    render(<ProductCard product={mockProduct} />)

    expect(screen.getByText(mockProduct.category)).toBeInTheDocument()
    expect(screen.getByAltText(mockProduct.title)).toHaveAttribute('src', mockProduct.thumbnail)
    expect(screen.getByText(mockProduct.category)).toBeInTheDocument()
    expect(screen.getByText(mockProduct.title)).toBeInTheDocument()
    expect(screen.getByText(formatNumberWithCommas(mockProduct.price))).toBeInTheDocument()
  })

  it('should add the product to cart when Add to cart button is clicked', async () => {
    render(<ProductCard product={mockProduct} />)

    const user = userEvent.setup()
    const cart = renderHook(() => useCartItems())

    const button = screen.getByRole('button', { name: /Add to Cart/i })

    await user.click(button)

    expect(cart.result.current.length).toBe(1)
  })

  it('should navigate to product details page when VIew button is clicked', async () => {
    const mockNavigate = vi.fn()
    vi.mocked(useNavigate).mockReturnValue(mockNavigate)

    const user = userEvent.setup()

    render(<ProductCard product={mockProduct} />)

    const button = screen.getByRole('button', { name: /view/i })

    await user.click(button)

    expect(mockNavigate).toHaveBeenCalledWith({
      to: '/items/$itemId',
      params: { itemId: String(mockProduct.id) },
    })
  })
})
