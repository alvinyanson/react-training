import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { fetchProducts } from '../api/product.service';
import { Product } from '../types/product';
import { useCartActions } from '../stores/cart.store';
import { formatNumberWithCommas } from '../util';

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
      <h3>Hello!</h3>

      <div className="row mt-4">
        {result.products.map((product: Product) => (
          <div className="col-md-3 col-12 mb-4" key={product.id}>
            <div className="card">
              <div className="position-absolute top-0 end-0 m-2">
                <span className="badge bg-danger">{product.category}</span>
              </div>
              <img
                src={product.thumbnail}
                className="card-img-top p-5"
                alt={product.title}
              />
              <div className="card-body">
                <h6 className="card-title">{product.title}</h6>
                <h4 className='mb-4'>{formatNumberWithCommas(product.price)}</h4>

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
