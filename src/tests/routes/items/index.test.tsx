import { ItemDetailComponent } from '@/routes/items/$itemId'
import { CartActions } from '@/stores/cart.state'
import { useCartActions } from '@/stores/cart.store'
import { mockProduct } from '@/tests/mocks/product'
import {
  createRootRoute,
  createRoute,
  createRouter,
  Link,
  RouterProvider,
} from '@tanstack/react-router'
import {
  act,
  fireEvent,
  render,
  renderHook,
  RenderHookResult,
  screen,
} from '@testing-library/react'

// vi.mock('@tanstack/react-router', async () => {
//   const actual = await vi.importActual('@tanstack/react-router')
//   return {
//     ...actual,
//     useNavigate: vi.fn(),
//     useLoaderData: () => ({
//       ...mockProduct,
//     }),
//   }
// })

describe('Item detail component', () => {
  let cartActions: RenderHookResult<CartActions, unknown>

  const rootRoute = createRootRoute({})
  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => (
      <Link to="/items/$itemId" params={{ itemId: String(mockProduct.id) }}>
        View
      </Link>
    ),
  })

  const nestedRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: `/items/${mockProduct.id}`,
    loader: async () => mockProduct,
    component: () => <ItemDetailComponent />,
  })

  const routeTree = rootRoute.addChildren([nestedRoute, indexRoute])
  const router = createRouter({ routeTree })

  beforeEach(() => {
    cartActions = renderHook(() => useCartActions())

    act(() => {
      cartActions.result.current.addToCart(mockProduct)
    })
  })

  it('should display the product info correctly', async () => {
    // const mockNavigate = vi.fn()
    // vi.mocked(useNavigate).mockReturnValue(mockNavigate)

    render(<RouterProvider router={router} />)

    const viewButton = await screen.findByText(/view/i)
    fireEvent.click(viewButton)

    const addToCartButton = await screen.findByText(/Add to Cart/i)
    const title = await screen.findByText(mockProduct.title)
    const img = await screen.findByAltText(mockProduct.title)
    const description = await screen.findByText(mockProduct.description)

    expect(addToCartButton).toBeInTheDocument()
    expect(title).toBeInTheDocument()
    expect(img).toHaveAttribute('src', mockProduct.images[0])
    expect(description).toBeInTheDocument()
    expect(router.state.location.href).toBe(`/items/${mockProduct.id}`)
    expect(window.location.pathname).toBe(`/items/${mockProduct.id}`)
  })
})
