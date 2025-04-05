import { CartComponent } from '@/routes/cart'
import { CartActions } from '@/stores/cart.state'
import { useCartActions, useCartItems } from '@/stores/cart.store'
import { mockCartItem, mockProduct } from '@/tests/mocks/product'
import { CartItem } from '@/types/cart.item'
import { formatNumberWithCommas } from '@/util'
import { act, render, renderHook, RenderHookResult, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('Cart Index component', () => {
  let cartActions: RenderHookResult<CartActions, unknown>
  let cartItems: RenderHookResult<CartItem[], unknown>

  beforeEach(() => {
    cartActions = renderHook(() => useCartActions())
    cartItems = renderHook(() => useCartItems())

    act(() => {
      for (let i = 0; i < 3; i++) {
        cartActions.result.current.addToCart(mockProduct)
      }
    })
  })

  afterEach(() => {
    act(() => {
      cartItems.result.current = []
    })
  })

  it('should render page title', () => {
    render(<CartComponent />)

    expect(screen.getByText(/Shopping Cart/i)).toBeInTheDocument()
  })

  it('should display cart item info correctly', () => {
    render(<CartComponent />)

    expect(screen.getByAltText(/Ice Cream/i)).toHaveAttribute('src', mockProduct.thumbnail)
    expect(screen.getByText(/Ice Cream/i)).toBeInTheDocument()
    expect(screen.getByText(/groceries/i)).toBeInTheDocument()
  })

  it('should display the correct total for the item with 3qty', () => {
    const totalPrice = cartItems.result.current.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    )

    render(<CartComponent />)

    expect(screen.getByLabelText('total price')).toHaveTextContent(
      formatNumberWithCommas(totalPrice)
    )
  })

  it('should render text Cart is empty if there are no items in cart', () => {
    render(<CartComponent />)

    act(() => {
      cartActions.result.current.removeFromCart(mockCartItem)
    })

    expect(screen.getByText('Cart is empty')).toBeInTheDocument()
  })

  it('should clear the cart items if Checkout button is called', async () => {
    const user = userEvent.setup()
    const checkoutSpy = vi.spyOn(cartActions.result.current, 'checkout')
    vi.spyOn(window, 'confirm').mockReturnValue(true)

    render(<CartComponent />)
    const checkoutButton = screen.getByLabelText(/checkout/i)
    await user.click(checkoutButton)

    expect(cartItems.result.current.length).toBe(0)
    expect(checkoutSpy).toHaveBeenCalled()
  })

  it('should increase item quantity to 4 if + button is clicked', async () => {
    const user = userEvent.setup()
    const increaseQtySpy = vi.spyOn(cartActions.result.current, 'increaseQty')
    render(<CartComponent />)

    const increaseButton = screen.getByRole('button', { name: /add/i })
    await user.click(increaseButton)

    expect(cartItems.result.current[0].quantity).toBe(4)
    expect(increaseQtySpy).toHaveBeenCalled()
  })

  it('should decrease item quantity to 2 if - button is clicked', async () => {
    const user = userEvent.setup()
    const decreaseQtySpy = vi.spyOn(cartActions.result.current, 'decreaseQty')
    render(<CartComponent />)

    const decreaseButton = screen.getByRole('button', { name: /minus/i })
    await user.click(decreaseButton)

    expect(cartItems.result.current[0].quantity).toBe(2)
    expect(decreaseQtySpy).toHaveBeenCalled()
  })

  it('should remove the only item in cart if X button is clicked', async () => {
    const removeFromCartSpy = vi.spyOn(cartActions.result.current, 'removeFromCart')
    const user = userEvent.setup()
    render(<CartComponent />)

    const buttonRemove = screen.getByRole('button', { name: /remove/i })
    await user.click(buttonRemove)

    expect(cartItems.result.current.length).toBe(0)
    expect(removeFromCartSpy).toHaveBeenCalled()
  })
})
