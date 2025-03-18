import { createFileRoute } from '@tanstack/react-router';
import { fetchProductById } from '../../api/product.service';
import { useCartActions } from '../../stores/cart.store';

export const Route = createFileRoute('/items/$itemId')({
  component: RouteComponent,
  loader: async ({ params: { itemId } }) => {
    return await fetchProductById(Number(itemId));
  },
});

function RouteComponent() {
  const product = Route.useLoaderData();
  const { addToCart } = useCartActions();

  return (
    <>
      <div className="container">
        <h1 className="mt-5">{product.title}</h1>
        <div className="row">
          <div className="col-md-6 col-12">
            <div className="">
              <img
                src={product.images[0]}
                className="img-fluid"
                alt={product.title}
              ></img>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <p className="lead">{product.description}</p>
            <h3>${product.price}</h3>
            <br />
            <button onClick={() => addToCart(product)} className="btn btn-dark">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
