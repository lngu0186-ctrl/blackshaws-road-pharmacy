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
  // Primary categories
  {
    id: 'medicines',
    name: 'Medicines & Treatments',
    slug: 'medicines',
    description: 'Prescription and over-the-counter medications for common conditions',
    icon: 'pill',
  },
  {
    id: 'vitamins-supplements',
    name: 'Vitamins & Supplements',
    slug: 'vitamins-supplements',
    description: 'Nutritional supplements, vitamins, minerals, and wellness products',
    icon: 'activity',
  },
  {
    id: 'baby-child',
    name: 'Baby & Children',
    slug: 'baby-child',
    description: 'Products for babies and children including formula, nappies, and childcare essentials',
    icon: 'baby',
  },
  {
    id: 'skincare',
    name: 'Skin Care',
    slug: 'skincare',
    description: 'Skincare products, cleansers, moisturisers, treatments, and sun protection',
    icon: 'sparkles',
  },
  {
    id: 'beauty',
    name: 'Beauty & Cosmetics',
    slug: 'beauty',
    description: 'Makeup, cosmetics, and beauty tools',
    icon: 'heart',
  },
  {
    id: 'personal-care',
    name: 'Personal Care',
    slug: 'personal-care',
    description: 'Oral care, hair care, body care, and hygiene products',
    icon: 'user',
  },
  {
    id: 'first-aid',
    name: 'First Aid',
    slug: 'first-aid',
    description: 'Bandages, antiseptics, wound care, and emergency supplies',
    icon: 'bandage',
  },
  {
    id: 'health-devices',
    name: 'Health Devices',
    slug: 'health-devices',
    description: 'Medical devices, monitors, thermometers, and home health equipment',
    icon: 'heart-pulse',
  },
  {
    id: 'weight-management',
    name: 'Weight Management',
    slug: 'weight-management',
    description: 'Meal replacements, protein powders, and weight loss supplements',
    icon: 'scale',
  },
  {
    id: 'dental-care',
    name: 'Dental Care',
    slug: 'dental-care',
    description: 'Toothpaste, toothbrushes, floss, and oral hygiene products',
    icon: 'tooth',
  },
  {
    id: 'hair-care',
    name: 'Hair Care',
    slug: 'hair-care',
    description: 'Shampoo, conditioner, styling products, and hair treatments',
    icon: 'wind',
  },
  {
    id: 'mens-health',
    name: "Men's Health",
    slug: 'mens-health',
    description: 'Prostate health, testosterone support, and men-specific wellness products',
    icon: 'shield',
  },
  {
    id: 'womens-health',
    name: "Women's Health",
    slug: 'womens-health',
    description: 'Feminine hygiene, pregnancy, menopause, and women-specific supplements',
    icon: 'heart',
  },
  {
    id: 'sports-nutrition',
    name: 'Sports & Nutrition',
    slug: 'sports-nutrition',
    description: 'Protein powders, energy supplements, and sports recovery products',
    icon: 'zap',
  },
  {
    id: 'home-health',
    name: 'Home Health',
    slug: 'home-health',
    description: 'Home medical supplies, mobility aids, and health monitoring devices',
    icon: 'home',
  },
  {
    id: 'pharmacy-essentials',
    name: 'Pharmacy Essentials',
    slug: 'pharmacy-essentials',
    description: 'General health and wellness products that belong in every household',
    icon: 'stethoscope',
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
    keywords: ['paracetamol', 'ibuprofen', 'aspirin', 'cold', 'flu', 'cough', 'throat', 'pain relief', 'antihistamine', 'decongestant', 'antibiotic', 'antacid', 'laxative', 'probiotic', 'nasal spray', 'eye drops', 'ear drops'],
    tags: ['medicine', 'otc', 'pain relief', 'cold & flu', 'cough', 'allergy', 'indigestion', 'laxatives', 'antibiotic', 'prescription', 'therapeutic'],
    productTypes: ['Medicine', 'Pharmaceutical', 'OTC', 'Prescription', 'Therapeutic'],
    vendors: ['Pharma', 'Medical', 'Generic'],
    collections: ['medicines', 'pharmacy-medications', 'over-the-counter', 'otc', 'cold-flu', 'pain-management', 'allergy', 'digestive-health'],
  },
  'vitamins-supplements': {
    keywords: ['vitamin', 'supplement', 'multivitamin', 'fish oil', 'omega', 'calcium', 'iron', 'vitamin c', 'vitamin d', 'b vitamins', 'magnesium', 'zinc', 'probiotic', 'prebiotic', 'herbal', 'natural', 'superfood', 'nutrient', 'mineral', 'glucosamine', 'chondroitin', 'turmeric', 'echinacea', 'ginkgo', 'ginseng', 'melatonin', 'collagen', 'protein powder', 'meal replacement'],
    tags: ['vitamin', 'supplement', 'nutrition', 'herbal', 'natural', 'omega-3', 'probiotic', 'amino acid', 'mineral', 'antioxidant'],
    productTypes: ['Vitamin', 'Supplement', 'Herbal', 'Nutritional', 'Nutraceutical', 'Protein Powder', 'Meal Replacement'],
    vendors: ['Swisse', 'Blackmores', 'Thompson\'s', 'BioOil', 'Energiser', 'Nature\'s Own', 'Vital', 'Herb of Gold', 'Elevit', 'Proval'],
    collections: ['vitamins', 'supplements', 'nutrition', 'herbal', 'sports-nutrition', 'weight-management', 'wellness'],
  },
  'baby-child': {
    keywords: ['baby', 'infant', 'toddler', 'child', 'formula', 'milk', 'nappy', 'diaper', 'wipes', 'baby food', 'puree', 'pablum', 'sunscreen', 'baby oil', 'baby wash', 'shampoo', 'bottle', 'teething', 'dummy', 'pacifier', 'stroller', 'pram', 'baby carrier', 'cot', 'high chair'],
    tags: ['baby', 'infant', 'toddler', 'childcare', 'nappies', 'formula', 'baby food', 'baby care'],
    productTypes: ['Baby Formula', 'Baby Food', 'Nappies', 'Baby Wipes', 'Baby Care', 'Child Care', 'Infant Formula'],
    vendors: ['Aptamil', 'Nan', 'Bellamy\'s Organic', 'Oli6', 'Hipp', 'Karicare', 'S26', 'NAN', 'A24', 'Oli6', 'Sustagen', 'Pedialyte'],
    collections: ['baby', 'infant', 'toddler', 'nappies', 'formula', 'baby-food', 'childcare'],
  },
  skincare: {
    keywords: ['skincare', 'face wash', 'cleanser', 'moisturiser', 'face cream', 'serum', 'sunscreen', 'spf', 'toner', 'exfoliant', 'mask', 'acne', 'pimple', 'anti-aging', 'anti-age', 'retinol', 'vitamin c serum', 'hyaluronic', 'niacinamide', 'benzoyl peroxide', 'salicylic', 'acne treatment', 'scar', 'pigmentation', 'dark spots', 'skin brightening', 'skin lightening'],
    tags: ['skincare', 'face', 'moisturiser', 'cleanser', 'serum', 'sunscreen', 'anti-aging', 'acne', 'treatment', 'toner', 'mask'],
    productTypes: ['Skincare', 'Face Wash', 'Moisturiser', 'Serum', 'Sunscreen', 'Facial Treatment', 'Toner', 'Face Mask'],
    vendors: ['Cetaphil', 'CeraVe', ' Neutrogena', 'Olay', 'Nivea', 'La Roche-Posay', 'Avène', 'Bioderma', 'Eucerin', 'Avene', 'Dermalogica', 'Clinique', 'The Ordinary'],
    collections: ['skincare', 'face-care', 'body-care', 'suncare', 'acne-care', 'anti-aging'],
  },
  beauty: {
    keywords: ['makeup', 'mascara', 'lipstick', 'foundation', 'concealer', 'eyeshadow', 'eyeliner', 'blush', 'bronzer', 'powder', 'makeup remover', 'cosmetic', 'beauty', 'lip gloss', 'lip balm', 'nail polish', 'eyebrow', 'false eyelash', 'beauty tool', 'brush', 'sponge', ' Beauty', 'cosmetics'],
    tags: ['makeup', 'cosmetics', 'beauty', 'lipstick', 'mascara', 'eyeshadow', 'foundation', 'beauty tool'],
    productTypes: ['Makeup', 'Cosmetic', 'Beauty Tool', 'Nail Care', 'Nail Polish'],
    vendors: ['Revlon', 'Maybelline', 'L\'Oréal', 'MAC', 'Clinique', 'Chanel', 'Dior', 'NARS', 'NYX', 'e.l.f.', 'Australis', 'Face Of Australia'],
    collections: ['makeup', 'cosmetics', 'beauty', 'nails', 'beauty-tools'],
  },
  'personal-care': {
    keywords: ['shampoo', 'conditioner', 'body wash', 'soap', 'hand wash', 'toothpaste', 'toothbrush', 'deodorant', 'antiperspirant', 'body lotion', 'hand cream', 'lip balm', 'mouthwash', 'floss', 'hair treatment', 'hair oil', 'hair serum', 'shave', 'shaving cream', 'razor', 'electric shaver', 'depilatory', 'hair colour', 'dye', 'bleach', 'perm', 'hair styler', 'hair dryer', 'hair straightener', 'curling iron'],
    tags: ['hair care', 'body wash', 'soap', 'toothpaste', 'toothbrush', 'deodorant', 'oral care', 'bath & body', 'shaving'],
    productTypes: ['Shampoo', 'Conditioner', 'Body Wash', 'Soap', 'Toothpaste', 'Toothbrush', 'Deodorant', 'Oral Care', 'Bath & Body', 'Hair Care', 'Shaving'],
    vendors: ['Dove', 'Nivea', 'Sunsilk', 'Head & Shoulders', 'Pantene', 'Oral-B', 'Colgate', 'Lacoste', 'Mitchum', 'Rexona', 'Neutrogena', 'Clear', 'Garnier'],
    collections: ['hair-care', 'bath-body', 'oral-care', 'shaving', 'deodorant', 'personal-care'],
  },
  'first-aid': {
    keywords: ['bandage', 'plaster', 'band-aid', 'antiseptic', 'antiseptic cream', 'iodine', 'betadine', 'wound wash', 'saline', 'scissors', 'tape', 'gauze', 'cotton', 'cotton bud', 'q-tip', 'first aid', 'emergency', 'tourniquet', 'helicopter', 'steri-strip', 'suture', 'gloves', 'mask', 'face mask', 'sanitiser', 'hand sanitizer', 'thermometer', 'fever', 'burn gel', 'aloe vera', 'blister', 'callus', 'corn'],
    tags: ['first aid', 'bandage', 'antiseptic', 'wound care', 'emergency', 'medical'],
    productTypes: ['First Aid', 'Bandage', 'Antiseptic', 'Medical Supply', 'Wound Care'],
    vendors: ['Band-Aid', 'Dettol', 'Betadine', 'IVC', 'Smith & Nephew', 'ConvaTec', 'Urgo', 'Elastoplast'],
    collections: ['first-aid', 'wound-care', 'medical-supplies'],
  },
  'health-devices': {
    keywords: ['thermometer', 'blood pressure monitor', 'bp machine', 'pulse oximeter', 'oximeter', 'glucose meter', 'blood glucose', 'diabetes', 'scale', 'bathroom scale', 'weight scale', 'body scale', 'body composition', 'fitness tracker', 'pedometer', 'step counter', 'heart rate monitor', 'ecg', 'eeg', 'hearing aid', 'compression garment', 'support brace', 'knee brace', 'back brace', 'wrist brace', 'ankle brace', 'hot pack', 'cold pack', 'ice pack', 'massager', 'massage gun', 'tens machine', 'pain relief device', 'nebuliser', 'inhaler', 'spacer'],
    tags: ['medical device', 'monitor', 'thermometer', 'blood pressure', 'glucose', 'diabetes', 'fitness', 'health device', 'home health'],
    productTypes: ['Medical Device', 'Health Monitor', 'Thermometer', 'Blood Pressure Monitor', 'Glucose Meter', 'Scale', 'Fitness Tracker', 'Massager', 'Nebuliser'],
    vendors: ['Omron', 'Braun', 'Philips', 'Beurer', 'Microlife', 'iHealth', 'Dario', 'Freestyle', 'Accu-Chek', 'OneTouch', 'Tanita', 'Withings', 'Garmin', 'Fitbit', 'Apple'],
    collections: ['health-devices', 'medical-devices', 'monitoring', 'home-health'],
  },
  'weight-management': {
    keywords: ['weight loss', 'diet', 'slim', 'fat burner', 'appetite suppressant', 'meal replacement', 'shake', 'protein bar', 'low calorie', 'low carb', 'keto', 'thermogenic', 'metabolism', 'detox', 'cleanse', 'colon cleanse', 'l-carnitine', 'green tea extract', 'garcinia', 'konjac', 'shirataki', 'noodle', 'pasta', 'rice alternative'],
    tags: ['weight loss', 'meal replacement', 'protein', 'diet', 'slimming'],
    productTypes: ['Meal Replacement', 'Protein Powder', 'Weight Loss', 'Diet', 'Low Calorie', 'Snack'],
    vendors: ['Optifast', 'Slim Fast', 'Physiocal', 'Metabolic', 'Bio', 'Sustagen', 'Fortisip'],
    collections: ['weight-management', 'diet', 'meal-replacement', 'sports-nutrition'],
  },
  'dental-care': {
    keywords: ['toothpaste', 'toothbrush', 'electric toothbrush', 'floss', 'dental floss', 'interdental', 'mouthwash', 'mouth rinse', 'tongue scraper', 'dental pick', 'water flosser', 'oral irrigator', 'denture', 'dental care', 'teeth whitening', 'whitening', 'bleaching', 'tooth gel', 'tooth powder', 'baking soda', 'fluoride', 'sensitive teeth', 'tooth sensitivity'],
    tags: ['dental', 'toothpaste', 'toothbrush', 'floss', 'mouthwash', 'oral care', 'teeth whitening'],
    productTypes: ['Toothpaste', 'Toothbrush', 'Electric Toothbrush', 'Dental Floss', 'Mouthwash', 'Dental Care', 'Teeth Whitening'],
    vendors: ['Colgate', 'Oral-B', 'Sensodyne', 'DentalPro', 'Polident', 'Polident', 'Lacalut', 'Paroex'],
    collections: ['dental-care', 'oral-care', 'teeth-whitening'],
  },
  'hair-care': {
    keywords: ['shampoo', 'conditioner', 'hair mask', 'hair treatment', 'hair oil', 'hair serum', 'hair spray', 'hair gel', 'hair mousse', 'hair wax', 'hair pomade', 'hair colour', 'hair dye', 'hair bleach', 'perm', 'relaxer', 'curling iron', 'hair straightener', 'hair dryer', 'hairbrush', 'comb', 'scalp treatment', 'dandruff', 'hair loss', 'thinning hair', 'hair growth', 'biotin', 'keratin', 'argan oil', 'moroccanoil'],
    tags: ['hair care', 'shampoo', 'conditioner', 'treatment', 'colour', 'styling', 'scalp care'],
    productTypes: ['Shampoo', 'Conditioner', 'Hair Treatment', 'Hair Color', 'Styling Product', 'Hair Tool'],
    vendors: ['Head & Shoulders', 'Pantene', 'Sunsilk', 'Garnier', 'L\'Oréal', 'Schwarzkopf', 'Wella', 'Kerastase', 'Moroccanoil', 'OGX', 'TRESemmé'],
    collections: ['hair-care', 'shampoo', 'conditioner', 'hair-styling', 'hair-treatment'],
  },
  'mens-health': {
    keywords: ['prostate', 'testosterone', 'male', 'men\'s', 'men', 'hair loss', 'male pattern baldness', 'finasteride', 'minoxidil', 'erectile dysfunction', 'viagra', 'cialis', 'levitra', 'sexual health', 'libido', 'energy', 'male supplement', 'zinc', 'selenium', 'saw palmetto', 'pump', 'pre-workout'],
    tags: ['men\'s health', 'prostate', 'testosterone', 'hair loss', 'sexual health', 'male supplement'],
    productTypes: ['Men\'s Health', 'Prostate Health', 'Testosterone Support', 'Hair Loss Treatment', 'Sexual Health'],
    vendors: [' vitamax', 'swisse mens', 'blackmores mens', 'finpecia', 'proscar', 'propecia', 'cialis', 'viagra'],
    collections: ['mens-health', 'prostate', 'sexual-health', 'male-supplements'],
  },
  'womens-health': {
    keywords: ['pregnancy', 'pregnant', 'prenatal', 'postnatal', 'fertility', 'contraceptive', 'birth control', 'pill', 'iud', 'morning after', 'emergency contraception', 'menopause', 'hot flush', 'pms', 'pmt', 'menstrual', 'period', 'cramps', 'bloating', 'pms relief', 'feminine hygiene', 'sanitary pad', 'tampon', 'panty liner', 'vaginal', 'uti', 'yeast infection', 'bacterial vaginosis', 'thrush', 'yeast', 'vaginal health', 'women\'s multivitamin', 'folic acid', 'iron', 'calcium', 'vitamin d', 'elevit', 'pregvit'],
    tags: ['women\'s health', 'pregnancy', 'prenatal', 'postnatal', 'contraception', 'feminine hygiene', 'menopause', 'pms'],
    productTypes: ['Women\'s Health', 'Pregnancy', 'Contraception', 'Menopause', 'Menstrual Care', 'Feminine Hygiene', 'Prenatal Vitamin'],
    vendors: ['Elevit', 'Pregvit', 'Swisse Women', 'Blackmores Women', 'Bellamy\'s Organic', 'Ural', 'Chemist Care'],
    collections: ['womens-health', 'pregnancy', 'feminine-hygiene', 'contraception', 'menopause'],
  },
  'sports-nutrition': {
    keywords: ['protein', 'whey', 'whey protein', 'plant protein', 'vegan protein', 'bcaa', 'creatine', 'pre-workout', 'post-workout', 'energy drink', 'energy bar', 'recovery', 'muscle', 'gain', 'mass', 'lean', 'weight gainer', 'nitric oxide', 'pump', 'endurance', 'athlete', 'fitness', 'gym', 'workout', 'exercise', 'sport', 'running', 'cycling', 'swimming'],
    tags: ['sports nutrition', 'protein', 'bcaa', 'creatine', 'pre-workout', 'recovery', 'fitness'],
    productTypes: ['Protein Powder', 'Protein Bar', 'BCAA', 'Creatine', 'Pre-Workout', 'Post-Workout', 'Sports Drink', 'Energy Gel'],
    vendors: ['Optimum Nutrition', 'Dymatize', 'MuscleTech', 'BSN', 'MyProtein', 'Cellucor', 'Ghost', 'Redcon1', 'ORE'],
    collections: ['sports-nutrition', 'protein', 'workout', 'fitness', 'bodybuilding'],
  },
  'pharmacy-essentials': {
    keywords: ['multivitamin', 'vitamin c', 'vitamin d', 'zinc', 'echinacea', 'garlic', 'cranberry', 'probiotic', 'fish oil', 'omega', 'calcium', 'magnesium', 'iron', 'b complex', 'energy', 'immunity', 'cold', 'flu', 'sleep', 'melatonin', 'stress', 'anxiety', 'digestive', 'liver', 'detox', 'milk thistle', 'st johns wort', '5-htp'],
    tags: ['general health', 'multivitamin', 'immunity', 'energy', 'sleep', 'stress relief', 'digestive health'],
    productTypes: ['Multivitamin', 'Vitamin', 'Supplement', 'Herbal', 'Nutrient'],
    vendors: ['Swisse', 'Blackmores', 'Thompson\'s', 'Nature\'s Own', 'BioOil', 'Elevit', 'Ostelin', 'Vital'],
    collections: ['vitamins', 'general-health', 'wellness', 'immune-support'],
  },
}

/**
 * Categorize a product based on its metadata
 * Returns an array of category IDs that best describe the product
 */
export function categorizeProduct(product: Product): string[] {
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

  // Ensure at least one category
  if (categories.size === 0) {
    categories.add('pharmacy-essentials')
  }

  return Array.from(categories)
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
    let url = overrideImage.url.startsWith('//') ? `https:${overrideImage.url}` : overrideImage.url
    return `${url}?width=${width}&height=${height}&fit=pad&format=jpeg&quality=80`
  }
  const firstImage = product.images?.edges[0]?.node
  if (!firstImage) return '/placeholder-product.png'

  let url = firstImage.url.startsWith('//') ? `https:${firstImage.url}` : firstImage.url
  // Shopify CDN can resize images
  return `${url}?width=${width}&height=${height}&fit=pad&format=jpeg&quality=80`
}
