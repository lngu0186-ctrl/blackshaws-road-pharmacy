import { create } from 'zustand'
import { getAllProducts, type Product } from '../services/shopify'

interface ProductState {
  products: Product[]
  loading: boolean
  error: string | null
  lastFetched: number | null
  fetchAllProducts: (force?: boolean) => Promise<Product[]>
  setProducts: (products: Product[]) => void
}

const CACHE_KEY = 'brp:products:v2'
const CACHE_TTL_MS = 1000 * 60 * 30 // 30 minutes

interface CachedPayload {
  products: Product[]
  ts: number
}

function loadCache(): CachedPayload | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as CachedPayload
    if (!parsed?.ts || Date.now() - parsed.ts > CACHE_TTL_MS) return null
    return parsed
  } catch {
    return null
  }
}

function saveCache(products: Product[]) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify({ products, ts: Date.now() }))
  } catch {
    // quota exceeded — ignore
  }
}

const initialCache = loadCache()

// Module-level single in-flight promise to dedupe concurrent callers.
let inflight: Promise<Product[]> | null = null

export const useProductStore = create<ProductState>((set, get) => ({
  products: initialCache?.products ?? [],
  loading: false,
  error: null,
  lastFetched: initialCache?.ts ?? null,

  fetchAllProducts: async (force = false) => {
    const { products, lastFetched } = get()
    const fresh = lastFetched && Date.now() - lastFetched < CACHE_TTL_MS
    if (!force && fresh && products.length > 0) {
      return products
    }
    if (inflight) return inflight

    set({ loading: true, error: null })
    inflight = (async () => {
      try {
        const data = await getAllProducts()
        set({ products: data, loading: false, lastFetched: Date.now() })
        saveCache(data)
        return data
      } catch (err) {
        set({ error: (err as Error).message, loading: false })
        throw err
      } finally {
        inflight = null
      }
    })()
    return inflight
  },

  setProducts: (products) => {
    set({ products, lastFetched: Date.now() })
    saveCache(products)
  },
}))
