import type { ShopifyProduct } from '../services/shopify'

// ===============================
// Evelyn Faye–Inspired Pharmacy Category Taxonomy
// Refined based on actual EF product data scrapes
// ===============================

export interface SubCategory {
  id: string
  label: string
  keywords: string[]
}

export interface Category {
  id: string
  label: string
  keywords: string[]
  subcategories: SubCategory[]
}

// Helper: check if any keyword matches product fields
function matchesAnyKeyword(product: ShopifyProduct, keywords: string[]): boolean {
  const searchable = [
    product.title,
    product.description,
    product.descriptionHtml,
    product.productType,
    product.vendor,
    ...product.tags,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

  return keywords.some(kw => searchable.includes(kw.toLowerCase()))
}

// Classify product into category paths (e.g., "vitamins-minerals/multivitamins")
export function classifyProduct(product: ShopifyProduct): string[] {
  const matches = new Set<string>()

  for (const cat of CATEGORIES) {
    // Check subcategories first
    for (const sub of cat.subcategories) {
      if (matchesAnyKeyword(product, sub.keywords)) {
        matches.add(`${cat.id}/${sub.id}`)
        matches.add(cat.id)
      }
    }
    // Top-level fallback
    if (!matches.has(cat.id) && matchesAnyKeyword(product, cat.keywords)) {
      matches.add(cat.id)
    }
  }

  return Array.from(matches)
}

// Build index: path -> { count, products }
export function buildCategoryIndex(products: ShopifyProduct[]): Map<string, { count: number; products: ShopifyProduct[] }> {
  const index = new Map<string, { count: number; products: ShopifyProduct[] }>()
  for (const product of products) {
    const paths = classifyProduct(product)
    for (const path of paths) {
      const entry = index.get(path) || { count: 0, products: [] }
      entry.count++
      entry.products.push(product)
      index.set(path, entry)
    }
  }
  return index
}

export function getAllCategories(): Category[] {
  return CATEGORIES
}

export function getSubcategories(categoryId: string): SubCategory[] {
  const cat = CATEGORIES.find(c => c.id === categoryId)
  return cat ? cat.subcategories : []
}

export function formatPrice(amount: string, currencyCode: string): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: currencyCode,
  }).format(parseFloat(amount))
}

export function getProductImageUrl(product: ShopifyProduct, width: number = 600, height: number = 600, overrideUrl?: string): string {
  const imageUrl = overrideUrl || product.images?.edges[0]?.node?.url
  if (!imageUrl) return '/placeholder-product.png'
  const url = imageUrl.startsWith('//') ? `https:${imageUrl}` : imageUrl
  return `${url}?width=${width}&height=${height}&fit=pad&format=jpeg&quality=80`
}

export function isOnSale(product: ShopifyProduct): boolean {
  return product.variants.edges.some(
    edge => edge.node.compareAtPrice && parseFloat(edge.node.compareAtPrice.amount) > parseFloat(edge.node.price.amount)
  )
}

export function getSalePrice(product: ShopifyProduct): { amount: string; currencyCode: string } | null {
  for (const edge of product.variants.edges) {
    const v = edge.node
    if (v.compareAtPrice && parseFloat(v.compareAtPrice.amount) > parseFloat(v.price.amount)) {
      return v.price
    }
  }
  return null
}

export const CATEGORIES: Category[] = [
  {
    id: 'medicines',
    label: 'Medicines & Treatments',
    keywords: [
      'medicine', 'medication', 'otc', 'prescription', 'pharmaceutical', 'therapeutic',
      'paracetamol', 'aspirin', 'ibuprofen', 'nurofen', 'panadol', 'pain relief', 'pain killer',
      'cold', 'flu', 'cough', 'sore throat', 'lozenge', 'throat spray', 'decongestant',
      'antihistamine', 'allergy', 'hayfever', 'loratadine', 'cetirizine', 'fexofenadine',
      'nasal spray', 'eye drops', 'ear drops', 'antiseptic', 'betadine', 'antacid',
      'laxative', 'anti-diarrheal', 'reflux', 'heartburn', 'indigestion', 'nausea',
      'antibiotic', 'antiviral', 'antifungal', 'topical cream', 'ointment', 'medicated gel', 'patch',
      'first aid', 'bandage', 'plaster', 'band-aid', 'wound care', 'burn gel',
    ],
    subcategories: [],
  },
  {
    id: 'vitamins',
    label: 'Vitamins',
    keywords: [
      'vitamin', 'multivitamin', 'multi vitamin', 'vitamin a', 'vitamin b', 'b complex',
      'b12', 'b6', 'b9', 'folate', 'folic acid', 'niacin', 'riboflavin', 'thiamine',
      'vitamin c', 'ascorbic acid', 'vitamin d', 'cholecalciferol', 'vitamin e', 'tocopherol',
      'vitamin k', 'biotin', 'choline',
    ],
    subcategories: [],
  },
  {
    id: 'practitioner-only',
    label: 'Practitioner Only Supplements',
    keywords: [
      'practitioner only', 'practitioner-only', 'practitioner',
      'metagenics', 'bioceuticals', 'bio-practica', 'bioconcepts', 'bio practica',
      'orthoplex', 'mediherb', 'eagle natural health', 'designs for health', 'thorne',
      'researched nutritionals', 'integria', 'fusion health practitioner',
      'practitioner range', 'practitioner grade', 'practitioner supplement',
    ],
    subcategories: [],
  },
  {
    id: 'health-devices',
    label: 'Health Devices',
    keywords: [
      'thermometer', 'blood pressure monitor', 'bp machine', 'bp monitor', 'pulse oximeter',
      'oximeter', 'glucose meter', 'glucometer', 'blood glucose', 'diabetes monitor',
      'scale', 'bathroom scale', 'body scale', 'body composition', 'fitness tracker',
      'pedometer', 'heart rate monitor', 'ecg', 'hearing aid',
      'compression garment', 'support brace', 'knee brace', 'back brace', 'wrist brace', 'ankle brace',
      'tens machine', 'tens', 'nebuliser', 'inhaler', 'spacer', 'massager', 'massage gun',
      'medical device', 'health monitor', 'home health device',
    ],
    subcategories: [],
  },
]