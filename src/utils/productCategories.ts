import type { ShopifyProduct as Product } from '../services/shopify'

export type PharmacyCategory = {
  id: string
  name: string
  slug: string
  description?: string
  icon?: string
  parentId?: string
}

export const PHARMACY_CATEGORIES: PharmacyCategory[] = [
  {
    id: 'medicines',
    name: 'Medicines & Treatments',
    slug: 'medicines',
    description: 'Prescription and over-the-counter medications for common conditions',
    icon: 'pill',
  },
  {
    id: 'vitamins',
    name: 'Vitamins',
    slug: 'vitamins',
    description: 'Daily multivitamins and individual vitamin supplements',
    icon: 'activity',
  },
  {
    id: 'practitioner-only',
    name: 'Practitioner Only Supplements',
    slug: 'practitioner-only',
    description: 'High-strength supplements available with pharmacist guidance',
    icon: 'stethoscope',
  },
  {
    id: 'health-devices',
    name: 'Health Devices',
    slug: 'health-devices',
    description: 'Medical devices, monitors, thermometers, and home health equipment',
    icon: 'heart-pulse',
  },
]

// Mapping rules: keywords, tags, product types, vendors to categories
interface CategoryRule {
  keywords: string[]
  tags: string[]
  productTypes: string[]
  vendors: string[]
  collections: string[]
}

export const CATEGORY_RULES: Record<string, CategoryRule> = {
  medicines: {
    keywords: ['paracetamol', 'ibuprofen', 'aspirin', 'cold', 'flu', 'cough', 'throat', 'pain relief', 'antihistamine', 'decongestant', 'antibiotic', 'antacid', 'laxative', 'nasal spray', 'eye drops', 'ear drops', 'first aid', 'bandage', 'wound care', 'medication'],
    tags: ['medicine', 'otc', 'pain relief', 'cold & flu', 'cough', 'allergy', 'indigestion', 'laxatives', 'antibiotic', 'prescription', 'therapeutic', 'first aid'],
    productTypes: ['Medicine', 'Pharmaceutical', 'OTC', 'Prescription', 'Therapeutic', 'First Aid'],
    vendors: ['Pharma', 'Medical', 'Generic', 'Band-Aid', 'Dettol', 'Betadine'],
    collections: ['medicines', 'pharmacy-medications', 'over-the-counter', 'otc', 'cold-flu', 'pain-management', 'allergy', 'first-aid', 'wound-care'],
  },
  vitamins: {
    keywords: ['vitamin', 'multivitamin', 'multi vitamin', 'vitamin a', 'vitamin b', 'b complex', 'b12', 'vitamin c', 'vitamin d', 'vitamin e', 'vitamin k', 'biotin', 'folate', 'folic acid'],
    tags: ['vitamin', 'multivitamin'],
    productTypes: ['Vitamin', 'Multivitamin'],
    vendors: ['Ostelin', 'Cenovis'],
    collections: ['vitamins', 'multivitamins'],
  },
  'practitioner-only': {
    keywords: ['practitioner only', 'practitioner-only', 'practitioner range', 'practitioner grade'],
    tags: ['practitioner only', 'practitioner'],
    productTypes: ['Practitioner Only', 'Practitioner Supplement'],
    vendors: ['Metagenics', 'BioCeuticals', 'Bio-Practica', 'Orthoplex', 'MediHerb', 'Designs for Health', 'Thorne', 'Researched Nutritionals', 'Integria'],
    collections: ['practitioner-only', 'practitioner', 'practitioner-supplements'],
  },
  'health-devices': {
    keywords: ['thermometer', 'blood pressure monitor', 'bp machine', 'pulse oximeter', 'oximeter', 'glucose meter', 'blood glucose', 'diabetes monitor', 'scale', 'bathroom scale', 'body scale', 'body composition', 'fitness tracker', 'pedometer', 'heart rate monitor', 'ecg', 'hearing aid', 'compression garment', 'support brace', 'knee brace', 'back brace', 'wrist brace', 'ankle brace', 'massager', 'massage gun', 'tens machine', 'nebuliser', 'inhaler', 'spacer'],
    tags: ['medical device', 'monitor', 'thermometer', 'blood pressure', 'glucose', 'fitness', 'health device', 'home health'],
    productTypes: ['Medical Device', 'Health Monitor', 'Thermometer', 'Blood Pressure Monitor', 'Glucose Meter', 'Scale', 'Fitness Tracker', 'Massager', 'Nebuliser'],
    vendors: ['Omron', 'Braun', 'Philips', 'Beurer', 'Microlife', 'iHealth', 'Dario', 'Freestyle', 'Accu-Chek', 'OneTouch', 'Tanita', 'Withings', 'Garmin', 'Fitbit'],
    collections: ['health-devices', 'medical-devices', 'monitoring', 'home-health'],
  },
}

/**
 * Categorize a product based on its metadata
 * Returns an array of category IDs that best describe the product
 */
const categorizeCache: WeakMap<Product, string[]> = new WeakMap()
export function categorizeProduct(product: Product): string[] {
  const cached = categorizeCache.get(product)
  if (cached) return cached
  const categories: Set<string> = new Set()

  // Helper to match keywords in text
  const matchesKeyword = (text: string, keywords: string[]) => {
    const lower = text.toLowerCase()
    return keywords.some((kw) => lower.includes(kw.toLowerCase()))
  }

  // Helper to match tags
  const matchesTags = (tags: string[], tagKeywords: string[]) => {
    return tags.some((tag) => tagKeywords.some((kw) => tag.toLowerCase().includes(kw.toLowerCase())))
  }

  // Test each category rule
  for (const [categoryId, rule] of Object.entries(CATEGORY_RULES)) {
    let score = 0

    // Check title and description for keywords
    const combinedText = `${product.title} ${product.description} ${product.productType} ${product.vendor}`.toLowerCase()
    if (matchesKeyword(combinedText, rule.keywords)) {
      score += 3
    }

    // Check tags
    if (matchesTags(product.tags, rule.tags)) {
      score += 4
    }

    // Check productType
    if (rule.productTypes.some((pt) => product.productType.toLowerCase().includes(pt.toLowerCase()))) {
      score += 3
    }

    // Check vendor
    if (rule.vendors.some((v) => product.vendor.toLowerCase().includes(v.toLowerCase()))) {
      score += 2
    }

    // Check collections
    if (product.collections.edges.some((edge) => rule.collections.some((c) => edge.node.handle.toLowerCase().includes(c.toLowerCase()) || edge.node.title.toLowerCase().includes(c.toLowerCase())))) {
      score += 3
    }

    if (score > 0) {
      categories.add(categoryId)
    }
  }

  const result = Array.from(categories)
  categorizeCache.set(product, result)
  return result
}

/**
 * Build a category hierarchy from product mappings
 * Returns an object mapping category IDs to product counts
 */
export function buildCategoryIndex(products: Product[]): Map<string, { count: number; products: Product[] }> {
  const index = new Map<string, { count: number; products: Product[] }>()

  for (const product of products) {
    const productCategories = categorizeProduct(product)
    for (const catId of productCategories) {
      const entry = index.get(catId) || { count: 0, products: [] }
      entry.count++
      entry.products.push(product)
      index.set(catId, entry)
    }
  }

  return index
}

/**
 * Get all categories that have products
 */
export function getActiveCategories(products: Product[]): PharmacyCategory[] {
  const index = buildCategoryIndex(products)
  return PHARMACY_CATEGORIES.filter((cat) => index.has(cat.id))
}

/**
 * Get products for a specific category
 */
export function getProductsByCategory(products: Product[], categoryId: string): Product[] {
  const index = buildCategoryIndex(products)
  const entry = index.get(categoryId)
  return entry ? entry.products : []
}

/**
 * Check if a product is on sale
 */
export function isOnSale(product: Product): boolean {
  return product.variants.edges.some((edge) => edge.node.compareAtPrice && parseFloat(edge.node.compareAtPrice.amount) > parseFloat(edge.node.price.amount))
}

/**
 * Get the lowest sale price if any variant is on sale
 */
export function getSalePrice(product: Product): { amount: string; currencyCode: string } | null {
  for (const edge of product.variants.edges) {
    const variant = edge.node
    if (variant.compareAtPrice && parseFloat(variant.compareAtPrice.amount) > parseFloat(variant.price.amount)) {
      return variant.price
    }
  }
  return null
}

/**
 * Format a price for display
 */
export function formatPrice(amount: string, currencyCode: string): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: currencyCode,
  }).format(parseFloat(amount))
}

/**
 * Get a primary image URL for a product
 */
export function getProductImageUrl(product: Product, width: number = 600, height: number = 600, overrideImage?: { url: string; altText?: string }): string {
  if (overrideImage?.url) {
    const url = overrideImage.url.startsWith('//') ? `https:${overrideImage.url}` : overrideImage.url
    return `${url}?width=${width}&height=${height}&fit=pad&format=jpeg&quality=80`
  }
  const firstImage = product.images?.edges[0]?.node
  if (!firstImage) return '/placeholder-product.png'

  const url = firstImage.url.startsWith('//') ? `https:${firstImage.url}` : firstImage.url
  // Shopify CDN can resize images
  return `${url}?width=${width}&height=${height}&fit=pad&format=jpeg&quality=80`
}
