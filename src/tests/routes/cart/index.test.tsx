import { CartComponent } from '@/routes/cart'
import { useCartActions, useCartItems } from '@/stores/cart.store'
import { mockProduct } from '@/tests/mocks/product'
import { act, render, renderHook, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('Cart Index component', () => {
  beforeEach(() => {
    const actions = renderHook(() => useCartActions())

    act(() => {
      actions.result.current.addToCart(mockProduct)
      actions.result.current.addToCart(mockProduct)
      actions.result.current.addToCart(mockProduct)
    })
  })

  afterEach(() => {
    const cartItems = renderHook(() => useCartItems())

    act(() => {
      cartItems.result.current = []
    })
  })

  it('should render page title', () => {
    render(<CartComponent />)

    expect(screen.getByText(/Shopping Cart/i)).toBeInTheDocument()
  })

  it('should display cart items correctly', () => {
    render(<CartComponent />)

    expect(screen.getByAltText(/Ice Cream/i)).toHaveAttribute('src', mockProduct.thumbnail)
    expect(screen.getByText(/Ice Cream/i)).toBeInTheDocument()
    expect(screen.getByText(/groceries/i)).toBeInTheDocument()
  })

  it('should increase item quantity if + button is clicked', async () => {
    const user = userEvent.setup()
    // const actions = renderHook(() => useCartActions())
    const cart = renderHook(() => useCartItems())

    render(<CartComponent />)

    const button = screen.getByRole('button', { name: /add/i })

    await user.click(button)

    expect(cart.result.current[0].quantity).toBe(4) // before testing, total qty is 3
  })

  it('should decrease item quantity if - button is clicked', async () => {
    const user = userEvent.setup()
    const cart = renderHook(() => useCartItems())

    render(<CartComponent />)

    const buttonAdd = screen.getByRole('button', { name: /minus/i })
    await user.click(buttonAdd)

    expect(cart.result.current[0].quantity).toBe(2) // before testing, total qty is 3
  })
})
