import { create } from 'zustand'
import { getAllProducts, type Product } from '../services/shopify'

interface ProductState {
  products: Product[]
  loading: boolean
  error: string | null
  fetchAllProducts: () => Promise<void>
  setProducts: (products: Product[]) => void
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  loading: false,
  error: null,
  fetchAllProducts: async () => {
    set({ loading: true, error: null })
    try {
      const data = await getAllProducts()
      set({ products: data, loading: false })
    } catch (err) {
      set({ error: (err as Error).message, loading: false })
      throw err
    }
  },
  setProducts: (products) => set({ products }),
}))
