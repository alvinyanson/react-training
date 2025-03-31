import { createFileRoute } from '@tanstack/react-router'
import { fetchProducts } from '../api/product.service'
import ProductCard from '../components/product-card'
import { Product } from '../types/product'

export const Route = createFileRoute('/')({
  component: Index,
  loader: () => fetchProducts(),
})

function Index() {
  const result = Route.useLoaderData()

  return (
    <div className="p-2">
      <h3>Hello!</h3>

      <div className="row mt-4">
        {result.products.map((product: Product) => (
          <div className="col-sm-6 col-md-4 col-lg-3 col-12 mb-4" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}
