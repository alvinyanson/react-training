import { create } from 'zustand';
import { Product } from '../types/product';
import { CartItem } from '../types/cart.item';

type CartState = {
  cartItems: CartItem[];
  actions: {
    addToCart: (product: Product) => void;
    increaseQty: (cartItem: CartItem) => void;
    decreaseQty: (cartItem: CartItem) => void;
    removeFromCart: (cartItem: CartItem) => void;
    checkout: () => void;
  };
};

const useCartStore = create<CartState>((set) => ({
  cartItems: [],
  actions: {
    addToCart: (product: Product) =>
      set((state) => ({
        cartItems: [
          ...state.cartItems,
          {
            id: product.id,
            thumbnail: product.thumbnail || '',
            name: product.title,
            category: product.category,
            price: product.price,
            quantity: 1,
          } as CartItem,
        ],
      })),

    increaseQty: (cartItem: CartItem) =>
      set((state) => ({
        cartItems: state.cartItems.map((item) =>
          item.id === cartItem.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        ),
      })),

    decreaseQty: (cartItem: CartItem) =>
      set((state) => ({
        cartItems: state.cartItems.map((item) =>
          item.id === cartItem.id
            ? { ...item, quantity: (item.quantity || 1) - 1 }
            : item
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
}));

export const useCartItems = () => useCartStore((state) => state.cartItems);

export const useCartActions = () => useCartStore((state) => state.actions);
