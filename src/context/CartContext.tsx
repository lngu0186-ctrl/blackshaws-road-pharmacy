import { createContext, useContext, useReducer, useEffect } from 'react'
import type { ReactNode } from 'react'
import { createCart, getCart, addToCart, removeFromCart, updateCartItem } from '../services/shopify'
import type { Cart } from '../services/shopify'

const CART_STORAGE_KEY = 'brp_cart_id'

interface CartState {
  cart: Cart | null
  cartCount: number
  isCartOpen: boolean
}

type CartAction =
  | { type: 'SET_CART'; payload: Cart | null }
  | { type: 'SET_CART_COUNT'; payload: number }
  | { type: 'ADD_ITEM'; payload: { cart: Cart | null } }
  | { type: 'REMOVE_ITEM'; payload: { cart: Cart | null } }
  | { type: 'UPDATE_ITEM'; payload: { cart: Cart | null } }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'CLEAR_CART' }

const initialState: CartState = {
  cart: null,
  cartCount: 0,
  isCartOpen: false,
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'SET_CART': {
      const totalQuantity = action.payload?.lines?.edges.reduce((sum: number, edge: any) => sum + edge.node.quantity, 0) || 0
      return { ...state, cart: action.payload, cartCount: totalQuantity }
    }
    case 'SET_CART_COUNT':
      return { ...state, cartCount: action.payload }
    case 'ADD_ITEM':
    case 'REMOVE_ITEM':
    case 'UPDATE_ITEM': {
      const cart = action.payload.cart
      const totalQuantity = cart?.lines?.edges.reduce((sum: number, edge: any) => sum + edge.node.quantity, 0) || 0
      return { ...state, cart, cartCount: totalQuantity }
    }
    case 'OPEN_CART':
      return { ...state, isCartOpen: true }
    case 'CLOSE_CART':
      return { ...state, isCartOpen: false }
    case 'CLEAR_CART':
      return { ...state, cart: null, cartCount: 0 }
    default:
      return state
  }
}

const CartContext = createContext<{
  state: CartState
  addItem: (variantId: string, quantity: number) => Promise<void>
  removeItem: (lineItemId: string) => Promise<void>
  updateItem: (lineItemId: string, quantity: number) => Promise<void>
  openCart: () => void
  closeCart: () => void
  isCartOpen: boolean
  cartCount: number
  checkoutUrl: string | null
} | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  useEffect(() => {
    const initCart = async () => {
      const storedCartId = localStorage.getItem(CART_STORAGE_KEY)
      if (storedCartId) {
        try {
          const cart = await getCart(storedCartId)
          dispatch({ type: 'SET_CART', payload: cart })
        } catch (error) {
          console.warn('Failed to rehydrate cart, creating new:', error)
          const newCart = await createCart()
          localStorage.setItem(CART_STORAGE_KEY, newCart.id)
          dispatch({ type: 'SET_CART', payload: newCart })
        }
      } else {
        const newCart = await createCart()
        localStorage.setItem(CART_STORAGE_KEY, newCart.id)
        dispatch({ type: 'SET_CART', payload: newCart })
      }
    }
    initCart()
  }, [])

  const addItem = async (variantId: string, quantity: number) => {
    if (!state.cart) return
    const updatedCart = await addToCart(state.cart.id, variantId, quantity)
    dispatch({ type: 'ADD_ITEM', payload: { cart: updatedCart } })
    dispatch({ type: 'OPEN_CART' })
  }

  const removeItem = async (lineItemId: string) => {
    if (!state.cart) return
    const updatedCart = await removeFromCart(state.cart.id, lineItemId)
    dispatch({ type: 'REMOVE_ITEM', payload: { cart: updatedCart } })
  }

  const updateItem = async (lineItemId: string, quantity: number) => {
    if (!state.cart) return
    if (quantity <= 0) {
      await removeItem(lineItemId)
      return
    }
    const updatedCart = await updateCartItem(state.cart.id, lineItemId, quantity)
    dispatch({ type: 'UPDATE_ITEM', payload: { cart: updatedCart } })
  }

  const openCart = () => dispatch({ type: 'OPEN_CART' })
  const closeCart = () => dispatch({ type: 'CLOSE_CART' })

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateItem,
        openCart,
        closeCart,
        isCartOpen: state.isCartOpen,
        cartCount: state.cartCount,
        checkoutUrl: state.cart?.checkoutUrl || null,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
