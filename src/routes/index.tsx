import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { fetchProducts } from '../api/product.service';
import { Product } from '../types/product';
import { useCartActions } from '../stores/cart.store';

export const Route = createFileRoute('/')({
  component: Index,
  loader: () => fetchProducts(),
});

function Index() {
  const result = Route.useLoaderData();
  const navigate = useNavigate();
  const { addToCart } = useCartActions();

  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>

      <div className="row">
        {result.products.map((product: Product) => (
          <div className="col-md-3 col-12 mb-4" key={product.id}>
            <div className="card">
              <img
                src={product.thumbnail}
                className="card-img-top p-5"
                alt={product.title}
              />
              <div className="card-body">
                <h6 className="card-title">{product.title}</h6>
                <p className="card-text">{product.category}</p>
                <button
                  onClick={() => addToCart(product)}
                  className="btn btn-dark me-3"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() =>
                    navigate({
                      to: '/items/$itemId',
                      params: { itemId: String(product.id) },
                    })
                  }
                  className="btn btn-light"
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
