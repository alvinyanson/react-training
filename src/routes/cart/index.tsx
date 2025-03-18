import { createFileRoute } from '@tanstack/react-router';
import { useCartActions, useCartItems } from '../../stores/cart.store';
import { formatNumberWithCommas } from '../../util';

export const Route = createFileRoute('/cart/')({
  component: RouteComponent,
});

function RouteComponent() {
  const cartItems = useCartItems();
  const { increaseQty, decreaseQty, removeFromCart } = useCartActions();

  return (
    <>
      <h3>Shopping Cart</h3>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th></th>
            <th scope="col">Name</th>
            <th scope="col">Category</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Subtotal</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={item.name}>
              <th scope="row">{index + 1}</th>
              <td>
                <img
                  src={item.thumbnail}
                  className="img-thumbnail"
                  alt="..."
                  width={50}
                  height={50}
                />
              </td>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{formatNumberWithCommas(item.price)}</td>
              <td>{item.quantity}</td>
              <td>{formatNumberWithCommas(item.quantity * item.price)}</td>
              <td>
                <div
                  className="btn-group me-3"
                  role="group"
                  aria-label="Basic example"
                >
                  <button
                    onClick={() => increaseQty(item)}
                    type="button"
                    className="btn btn-light"
                  >
                    +
                  </button>
                  <button
                    onClick={() => decreaseQty(item)}
                    type="button"
                    className="btn btn-light"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item)}
                  type="button"
                  className="btn btn-danger"
                >
                  x
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={7} className="text-end">
              <h4>
                {formatNumberWithCommas(
                  cartItems.reduce(
                    (total, item) => total + item.quantity * item.price,
                    0
                  )
                )}
              </h4>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <br />
      <button className="btn btn-dark">Checkout</button>
    </>
  );
}
