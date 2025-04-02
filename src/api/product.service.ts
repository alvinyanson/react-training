import { ProductResponse, ProductsResponse } from '@/types/product'

const baseUrl = import.meta.env.VITE_DUMMY_JSON_BASE_URL

export const fetchProducts = async (): Promise<ProductsResponse> => {
  const res = await fetch(`${baseUrl}/products`)
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
}

export const fetchProductById = async (id: number): Promise<ProductResponse> => {
  const res = await fetch(`${baseUrl}/products/${id}`)
  if (!res.ok) throw new Error(`Failed to fetch product with id ${id}`)
  return res.json()
}
