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
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Shopping App
          </a>
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
              <Link to="/" className="nav-item">
                <span className="nav-link">Home</span>
              </Link>
              <Link to="/cart" className="nav-item">
                <span className="nav-link">Cart {cartItems.length || 0}</span>
              </Link>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container">
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
