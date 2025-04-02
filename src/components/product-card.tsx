import { useNavigate } from '@tanstack/react-router'
import { useCartActions } from '@/stores/cart.store'
import { Product } from '@/types/product'
import { formatNumberWithCommas } from '@/util'
import { memo } from 'react'

type ProductCardProps = {
  product: Product
}

function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate()
  const { addToCart } = useCartActions()

  return (
    <>
      <div className="card">
        {/* product category */}
        <div className="position-absolute top-0 end-0 m-2">
          <span className="badge bg-danger">{product.category}</span>
        </div>

        {/* product image */}
        <img src={product.thumbnail} className="card-img-top p-5" alt={product.title} />

        {/* product info */}
        <div className="card-body">
          <h6 className="card-title">{product.title}</h6>
          <h4 className="mb-4">{formatNumberWithCommas(product.price)}</h4>

          {/* add to cart button */}
          <button onClick={() => addToCart(product)} className="btn btn-dark me-3">
            Add to Cart
          </button>

          {/* view product button */}
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
    </>
  )
}

export default memo(ProductCard)
