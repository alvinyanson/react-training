import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { useCartItems } from '../stores/cart.store';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const cartItems = useCartItems();

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light position-fixed top-0 w-100"
        style={{ zIndex: 2 }}
      >
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            Shopping App
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <Link to="/" className="nav-link text-decoration-none">
                Home
              </Link>
              <Link to="/cart" className="nav-link">
                Cart <span className="badge bg-danger">{cartItems.length}</span>
              </Link>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-5">
        <div className="row">
          <div className="col-12 p-5">
            <Outlet />
            <TanStackRouterDevtools />
          </div>
        </div>
      </div>
    </>
  );
}
