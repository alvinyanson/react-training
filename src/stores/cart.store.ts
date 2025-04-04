import { create } from 'zustand'
import { Product } from '@/types/product'
import { CartItem } from '@/types/cart.item'
import { CartState } from '@/stores/cart.state'

// the cart store, not exported, so that no one can subscribe to the entire store
export const useCartStore = create<CartState>((set) => ({
  cartItems: [],
  actions: {
    addToCart: (product: Product) =>
      set((state) => ({
        cartItems: state.cartItems.some((item) => item.id === product.id)
          ? // item already exist in cart, just update qty
            state.cartItems.map((item) => {
              if (item.id === product.id) {
                return {
                  id: product.id,
                  thumbnail: product.thumbnail || '',
                  name: product.title,
                  category: product.category,
                  price: product.price,
                  quantity: (item.quantity || 1) + 1,
                }
              }
              return item
            })
          : // new item added to cart
            [
              ...state.cartItems,
              {
                id: product.id,
                thumbnail: product.thumbnail || '',
                name: product.title,
                category: product.category,
                price: product.price,
                quantity: 1,
              },
            ],
      })),

    increaseQty: (cartItem: CartItem) =>
      set((state) => ({
        cartItems: state.cartItems.map((item) =>
          item.id === cartItem.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        ),
      })),

    decreaseQty: (cartItem: CartItem) =>
      set((state) => ({
        cartItems: state.cartItems.map((item) =>
          item.id === cartItem.id ? { ...item, quantity: (item.quantity || 1) - 1 } : item
        ),
      })),

    removeFromCart: (cartItem: CartItem) =>
      set((state) => ({
        cartItems: state.cartItems.filter((item) => item.id !== cartItem.id),
      })),

    checkout: () =>
      set(() => ({
        cartItems: [],
      })),
  },
}))

// exported - consumers don't need to write selectors
export const useCartItems = () => useCartStore((state) => state.cartItems)

export const useCartActions = () => useCartStore((state) => state.actions)
