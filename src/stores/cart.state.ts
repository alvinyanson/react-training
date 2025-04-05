import { CartItem } from '@/types/cart.item'
import { Product } from '@/types/product'

export type CartState = {
  cartItems: CartItem[]
  actions: CartActions
}

export type CartActions = {
  addToCart: (product: Product) => void
  increaseQty: (cartItem: CartItem) => void
  decreaseQty: (cartItem: CartItem) => void
  removeFromCart: (cartItem: CartItem) => void
  checkout: () => void
}
