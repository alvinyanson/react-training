import { Link } from '@tanstack/react-router'
import { useCartItems } from '../stores/cart.store'

function Navbar() {
  const cartItems = useCartItems()

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light position-fixed top-0 w-100"
        style={{ zIndex: 2 }}
      >
        <div className="container-fluid">
          {/* app name */}
          <Link to="/" className="navbar-brand">
            Shopping App
          </Link>

          {/* smaller devices toggler */}
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

          {/* navigation links */}
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
    </>
  )
}

export default Navbar
