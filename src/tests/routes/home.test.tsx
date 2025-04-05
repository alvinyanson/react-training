import { HomeComponent } from '@/routes'
import { createRootRoute, createRoute, createRouter, RouterProvider } from '@tanstack/react-router'
import { render, screen } from '@testing-library/react'
import { mockProduct } from '../mocks/product'

describe('Home component', () => {
  const rootRoute = createRootRoute({})
  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    loader: async () => {
      return {
        products: [{ ...mockProduct }],
      }
    },
    component: () => <HomeComponent />,
  })

  const routeTree = rootRoute.addChildren([indexRoute])
  const router = createRouter({ routeTree })

  it('should render the home component', () => {
    render(<RouterProvider router={router} />)

    screen.debug()
  })
})
