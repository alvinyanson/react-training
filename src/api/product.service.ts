import { ProductResponse, ProductsResponse } from '../types/product'

const BASE_URL = 'https://dummyjson.com'

export const fetchProducts = async (): Promise<ProductsResponse> => {
  const res = await fetch(`${BASE_URL}/products`)
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
}

export const fetchProductById = async (id: number): Promise<ProductResponse> => {
  const res = await fetch(`${BASE_URL}/products/${id}`)
  if (!res.ok) throw new Error(`Failed to fetch product with id ${id}`)
  return res.json()
}
