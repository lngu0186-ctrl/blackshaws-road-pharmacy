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

  if (matches.size === 0) {
    matches.add('pharmacy-essentials')
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
  let url = imageUrl.startsWith('//') ? `https:${imageUrl}` : imageUrl
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
    id: 'vitamins-minerals',
    label: 'Vitamins & Minerals',
    keywords: ['vitamin', 'mineral', 'multivitamin', 'calcium', 'magnesium', 'iron', 'zinc', 'selenium', 'iodine', 'potassium', 'chromium', 'b12', 'b6', 'b9', 'folate', 'vitamin a', 'vitamin c', 'vitamin d', 'vitamin e', 'vitamin k', 'trace mineral', 'colloidal mineral'],
    subcategories: [
      { id: 'multivitamins', label: 'Multivitamins', keywords: ['multivitamin', 'multi vitamin', 'mv', 'men\'s multivitamin', 'women\'s multivitamin', 'kids multivitamin'] },
      { id: 'vitamin-a', label: 'Vitamin A', keywords: ['vitamin a', 'retinol', 'beta-carotene', 'vision', 'eye health'] },
      { id: 'vitamin-b', label: 'Vitamin B', keywords: ['vitamin b', 'b complex', 'b12', 'b6', 'b9', 'folate', 'niacin', 'riboflavin', 'thiamine', 'energy', 'fatigue'] },
      { id: 'vitamin-c', label: 'Vitamin C', keywords: ['vitamin c', 'ascorbic acid', 'immunity', 'cold', 'flu'] },
      { id: 'vitamin-d', label: 'Vitamin D', keywords: ['vitamin d', 'cholecalciferol', 'calciferol', 'bone', 'immune'] },
      { id: 'vitamin-e', label: 'Vitamin E', keywords: ['vitamin e', 'tocopherol', 'skin', 'antioxidant'] },
      { id: 'vitamin-k', label: 'Vitamin K', keywords: ['vitamin k', 'phytonadione', 'blood', 'bone'] },
      { id: 'calcium', label: 'Calcium', keywords: ['calcium', 'calcium citrate', 'calcium carbonate', 'bone', 'teeth'] },
      { id: 'magnesium', label: 'Magnesium', keywords: ['magnesium', 'magnesium oxide', 'magnesium citrate', 'magnesium glycinate', 'muscle', 'cramp', 'sleep'] },
      { id: 'iron', label: 'Iron', keywords: ['iron', 'ferrous sulfate', 'ferrous gluconate', 'anaemia', 'blood'] },
      { id: 'zinc', label: 'Zinc', keywords: ['zinc', 'zinc picolinate', 'zinc gluconate', 'immune', 'skin'] },
      { id: 'selenium', label: 'Selenium', keywords: ['selenium', 'thyroid', 'antioxidant'] },
      { id: 'iodine', label: 'Iodine', keywords: ['iodine', 'kelp', 'iodide', 'thyroid'] },
      { id: 'minerals-other', label: 'Other Minerals', keywords: ['chromium', 'manganese', 'copper', 'molybdenum', 'potassium', 'boron', 'molybdenum', 'trace mineral', 'colloidal mineral'] },
    ],
  },
  {
    id: 'supplements-herbs',
    label: 'Supplements & Herbs',
    keywords: ['supplement', 'herb', 'herbal', 'fish oil', 'krill oil', 'omega', 'probiotic', 'prebiotic', 'antioxidant', 'collagen', 'tissue salt', 'homeopathic', 'flower essence', 'mushroom', 'medicinal mushroom', 'superfood', 'greens', 'herbal remedy', 'extract', 'tincture', 'superfood blend'],
    subcategories: [
      { id: 'omega-fish-oil', label: 'Fish Oil & Omega-3', keywords: ['fish oil', 'krill oil', 'omega-3', 'omega3', 'epa', 'dha', 'algal oil', 'omega', 'blended omega oil', 'vegan omega'] },
      { id: 'probiotics-prebiotics', label: 'Probiotics & Prebiotics', keywords: ['probiotic', 'prebiotic', 'lactobacillus', 'bifidobacterium', 'saccharomyces', 'acidophilus', 'gut health', 'digestive', 'saccharomyces boulardii'] },
      { id: 'antioxidants', label: 'Antioxidants', keywords: ['antioxidant', 'coq10', 'coenzyme q10', 'alpha lipoic', 'resveratrol', 'glutathione', 'grape seed', 'pycnogenol', 'acai', 'turmeric', 'curcumin', 'general antioxidants'] },
      { id: 'collagen', label: 'Collagen', keywords: ['collagen', 'collagen peptides', 'hydrolyzed collagen', 'marine collagen', 'beauty collagen', 'skin collagen', 'collagen protein'] },
      { id: 'medicinal-mushrooms', label: 'Medicinal Mushrooms', keywords: ['mushroom', 'reishi', 'shiitake', 'maitake', 'lion\'s mane', 'cordyceps', 'chaga', 'turkey tail', 'medicinal mushroom', 'mushroom supplement', 'mushroom latte'] },
      { id: 'tissue-salts-homeopathy', label: 'Tissue Salts & Homeopathy', keywords: ['tissue salt', 'homeopathy', 'homeopathic', 'schuessler', 'cell salt', 'homeopathic remedy', 'homeopathic spray'] },
      { id: 'flower-essences', label: 'Flower Essences', keywords: ['flower essence', 'bach flower', 'bush flower', 'floral essence'] },
      { id: 'herbal-remedies', label: 'Herbal Remedies', keywords: ['herb', 'herbal', 'extract', 'tincture', 'echinacea', 'garlic', 'ginkgo', 'ginseng', 'milk thistle', 'st johns wort', 'valerian', 'passionflower', 'ashwagandha', 'turmeric', 'maca', 'brahmi', 'burdock', 'dandelion', 'chamomile', 'peppermint', 'herbal cream', 'herbal gel'] },
      { id: 'superfoods-greens', label: 'Superfoods & Greens', keywords: ['superfood', 'greens powder', 'spirulina', 'chlorella', 'wheatgrass', 'barley grass', 'beetroot', 'acai', 'goji berry', 'maca', 'cacao', 'raw food', 'super food blend', 'greens blend', 'wheatgrass powder', 'barley grass powder'] },
    ],
  },
  {
    id: 'health-concerns',
    label: 'Health Concerns',
    keywords: ['cold', 'flu', 'immunity', 'immune', 'cough', 'throat', 'allergy', 'hayfever', 'digestive', 'gut', 'heart', 'cholesterol', 'circulation', 'sleep', 'stress', 'anxiety', 'pain', 'inflammation', 'joint', 'bone', 'muscle', 'brain', 'memory', 'focus', 'eye', 'thyroid', 'hormone', 'liver', 'detox', 'kidney', 'urinary', 'diabetes', 'blood sugar', 'weight', 'energy', 'fatigue', 'constipation', 'bloating', 'ibs', 'sinus', 'migraine', 'skin disorder', 'acne', 'psoriasis', 'eczema', 'constipation relief', 'nausea', 'motion sickness', 'ear', 'nose'],
    subcategories: [
      { id: 'cold-flu-immunity', label: 'Cold, Flu & Immunity', keywords: ['cold', 'flu', 'influenza', 'immunity', 'immune', 'cough', 'throat', 'lozenge', 'echinacea', 'elderberry', 'zinc (immunity)', 'vitamin c (immunity)', 'cold & flu', 'cold relief', 'flu relief', 'immune support', 'general immunity', 'cough relief', 'throat spray'] },
      { id: 'digestive-gut-health', label: 'Digestive & Gut Health', keywords: ['digestive', 'gut', 'digestion', 'constipation', 'diarrhea', 'bloating', 'gas', 'ibs', 'gut health', 'probiotic', 'prebiotic', 'enzyme', 'acid reflux', 'gerd', 'nausea', 'digestive enzyme', 'digestive supplement', 'gut supplement', 'constipation relief', 'digestive detox', 'gut health support'] },
      { id: 'heart-circulation', label: 'Heart & Circulation', keywords: ['heart', 'cholesterol', 'circulation', 'cardiovascular', 'blood pressure', 'coq10', 'fish oil (heart)', 'omega (heart)', 'garlic', 'heart health', 'heart supplement', 'circulation supplement', 'cholesterol support', 'blood pressure support'] },
      { id: 'sleep-stress-anxiety', label: 'Sleep, Stress & Anxiety', keywords: ['sleep', 'insomnia', 'stress', 'anxiety', 'melatonin', 'magnesium (sleep)', 'valerian', 'passionflower', 'ashwagandha', '5-htp', 'theanine', 'sleep support', 'sleep aid', 'stress relief', 'anxiety relief', 'calming supplement', 'mood balance'] },
      { id: 'pain-inflammation', label: 'Pain & Inflammation', keywords: ['pain', 'inflammation', 'anti-inflammatory', 'turmeric', 'boswellia', 'arthritis', 'rheumatism', 'muscle pain', 'headache', 'migraine', 'pain relief', 'pain supplement', 'muscle cream', 'pain cream', 'joint cream', 'anti-inflammation', 'inflammation support', 'muscle pain relief'] },
      { id: 'joint-bone-muscle', label: 'Joint, Bone & Muscle', keywords: ['joint', 'bone', 'muscle', 'collagen (joint)', 'glucosamine', 'chondroitin', 'calcium (bone)', 'vitamin d (bone)', 'magnesium (muscle)', 'joint supplement', 'bone support', 'muscle support', 'joint health', 'bone health'] },
      { id: 'brain-memory-focus', label: 'Brain, Memory & Focus', keywords: ['brain', 'memory', 'focus', 'cognitive', 'concentration', 'nootropic', 'omega (brain)', 'b12 (brain)', 'ginkgo', 'bacopa', 'phosphatidylserine', 'brain supplement', 'memory support', 'focus supplement', 'cognitive support'] },
      { id: 'eye-health', label: 'Eye Health', keywords: ['eye', 'vision', 'macular', 'lutein', 'zeaxanthin', 'vitamin a (eye)', 'bilberry', 'omega (eye)', 'eye supplement'] },
      { id: 'thyroid-hormone', label: 'Thyroid & Hormone Health', keywords: ['thyroid', 'thyroxine', 'iodine (thyroid)', 'selenium (thyroid)', 'ashwagandha (thyroid)', 'hormone', 'adrenal', 'thyroid support'] },
      { id: 'liver-detox', label: 'Liver & Detox', keywords: ['liver', 'detox', 'cleansing', 'milk thistle', 'schisandra', 'dandelion', 'artichoke', 'glutathione (liver)', 'liver support', 'detox supplement', 'detox support'] },
      { id: 'kidney-urinary', label: 'Kidney & Urinary', keywords: ['kidney', 'urinary', 'bladder', 'cranberry', 'd-mannose', 'water retention', 'diuretic', 'kidney support', 'urinary supplement', 'urinary support'] },
      { id: 'allergy-hayfever', label: 'Allergy & Hayfever', keywords: ['allergy', 'allergic', 'hayfever', 'histamine', 'antihistamine', 'quercetin', 'butterbur', 'nasal spray', 'allergy relief', 'allergy support'] },
      { id: 'diabetes-blood-sugar', label: 'Diabetes & Blood Sugar', keywords: ['diabetes', 'blood sugar', 'glucose', 'insulin', 'blood glucose', 'glycemic', 'berberine', 'cinnamon', 'blood sugar support', 'diabetes support'] },
      { id: 'weight-management', label: 'Weight Management', keywords: ['weight', 'weight loss', 'slim', 'fat burner', 'appetite suppressant', 'metabolism', 'thermogenic', 'garcinia', 'green tea (weight)', 'konjac', 'shirataki', 'meal replacement', 'weight management', 'weight management supplement', 'fat loss'] },
      { id: 'energy-fatigue', label: 'Energy & Fatigue', keywords: ['energy', 'fatigue', 'tiredness', 'iron (energy)', 'b12 (energy)', 'coq10 (energy)', 'adaptogen', 'rhodiola', 'cordyceps (energy)', 'energy supplement', 'energy support', 'fatigue relief'] },
    ],
  },
  {
    id: 'womens-health',
    label: "Women's Health",
    keywords: ['women', 'pregnancy', 'prenatal', 'postnatal', 'breastfeeding', 'lactation', 'menopause', 'pms', 'pmt', 'menstrual', 'period', 'feminine', 'vaginal', 'uti', 'yeast', 'thrush', 'contraceptive', 'birth control', 'hormone (women)', 'estrogen', 'progesterone', 'women\'s health', 'female', 'womens', 'women specific', 'women\'s supplement'],
    subcategories: [
      { id: 'pregnancy-preconception', label: 'Pregnancy & Preconception', keywords: ['pregnancy', 'pregnant', 'preconception', 'fertility', 'preconception', 'folate (pregnancy)', 'folic acid', 'iodine (pregnancy)', 'iron (pregnancy)', 'elevit', 'pregvit', 'pregnancy supplement', 'preconception supplement'] },
      { id: 'breastfeeding', label: 'Breastfeeding', keywords: ['breastfeeding', 'lactation', 'lactating', 'milk supply', 'galactagogue', 'breastfeeding support'] },
      { id: 'menopause', label: 'Menopause', keywords: ['menopause', 'hot flush', 'night sweat', 'black cohosh', 'sage', 'soy isoflavones', 'hormone (menopause)', 'menopause relief', 'menopause supplement'] },
      { id: 'pms-menstrual', label: 'PMS & Menstrual Care', keywords: ['pms', 'pmt', 'menstrual', 'period', 'cramps', 'bloating', 'mood', 'vitamin b6 (pms)', 'magnesium (pms)', 'pms relief', 'period care', 'menstrual support'] },
      { id: 'feminine-care', label: 'Feminine Care', keywords: ['feminine', 'vaginal', 'uti', 'yeast infection', 'thrush', 'bacterial vaginosis', 'intimate wash', 'lubricant', 'feminine hygiene', 'feminine cream', 'nipple cream'] },
      { id: 'contraception', label: 'Contraception', keywords: ['contraceptive', 'birth control', 'pill', 'iud', 'morning after', 'emergency contraception'] },
      { id: 'womens-general', label: "Women's General Health", keywords: ['women\'s health', 'female health', 'women\'s multivitamin', 'women specific', 'women\'s general health'] },
    ],
  },
  {
    id: 'mens-health',
    label: "Men's Health",
    keywords: ['men', 'male', 'men\'s', 'prostate', 'testosterone', 'libido', 'sexual health', 'erectile', 'viagra', 'cialis', 'hair loss', 'male pattern baldness', 'finasteride', 'minoxidil', 'men\'s health', 'male', 'men specific'],
    subcategories: [
      { id: 'prostate-health', label: 'Prostate Health', keywords: ['prostate', 'prostatitis', 'enlarged prostate', 'psa', 'saw palmetto', 'pumpkin seed', 'lycopene', 'prostate supplement'] },
      { id: 'testosterone-libido', label: 'Testosterone & Libido', keywords: ['testosterone', 'libido', 'sexual health', 'erectile dysfunction', 'impotence', 'zinc (men)', 'maca', 'horny goat weed', 'tribulus', 'libido supplement', 'testosterone support', 'male libido'] },
      { id: 'mens-general', label: "Men's General Health", keywords: ['men\'s multivitamin', 'men\'s health', 'male supplement', 'zma', 'men specific', 'men\'s general health', 'mens health supplement'] },
    ],
  },
  {
    id: 'kids-health',
    label: 'Kids Health',
    keywords: ['kids', 'children', 'child', 'baby', 'infant', 'toddler', 'teen', 'teenager', 'baby formula', 'baby food', 'nappy', 'diaper', 'wipes', 'colic', 'teething', 'dummy', 'pacifier', 'children\'s health', 'kids health', 'childcare'],
    subcategories: [
      { id: 'childrens-vitamins', label: "Children's Vitamins", keywords: ['kids vitamin', 'children\'s vitamin', 'child multivitamin', 'vitamin d (kids)', 'iron (kids)', 'zinc (kids)', 'kids supplement', 'children\'s supplement'] },
      { id: 'baby-care', label: 'Baby Care', keywords: ['baby', 'infant', 'toddler', 'formula', 'milk', 'nappy', 'diaper', 'wipes', 'baby food', 'puree', 'teething', 'dummy', 'pacifier', 'baby oil', 'baby wash', 'baby shampoo', 'nappy cream', 'baby care', 'infant formula'] },
      { id: 'kids-immunity', label: "Kids' Immunity", keywords: ['kids immune', 'child immune', 'children\'s cold', 'kids flu', 'echinacea (kids)', 'elderberry (kids)', 'kids cold', 'kids immunity'] },
    ],
  },
  {
    id: 'sports-nutrition',
    label: 'Sports Nutrition',
    keywords: ['sport', 'fitness', 'gym', 'workout', 'athlete', 'exercise', 'training', 'protein', 'bcaa', 'creatine', 'pre-workout', 'post-workout', 'energy drink', 'recovery', 'muscle', 'weight gainer', 'mass', 'lean', 'nitric oxide', 'pump', 'endurance', 'carbohydrate', 'amino acid', 'electrolyte', 'sports drink', 'protein bar', 'protein powder', 'meal replacement', 'sports nutrition', 'preworkout', 'postworkout', 'sport supplement'],
    subcategories: [
      { id: 'protein-powders', label: 'Protein Powders', keywords: ['protein powder', 'whey protein', 'whey', 'plant protein', 'vegan protein', 'pea protein', 'rice protein', 'egg white protein', 'collagen (sports)', 'casein', 'protein blend', 'whey isolate', 'whey concentrate', 'hydrolyzed protein', 'beef protein', 'sprouted protein'] },
      { id: 'pre-post-workout', label: 'Pre & Post Workout', keywords: ['pre-workout', 'pre workout', 'post-workout', 'post workout', 'energy drink', 'energy bar', 'carbohydrate drink', 'recovery drink', 'preworkout', 'postworkout', 'stimulant pre-workout', 'non-stimulant pre-workout'] },
      { id: 'amino-acids', label: 'Amino Acids', keywords: ['bcaa', 'branched chain amino acid', 'creatine', 'glutamine', 'arginine', 'beta-alanine', 'citrulline', 'taurine', 'eaa', 'essential amino', 'amino acid supplement', 'l-glutamine', 'l-arginine'] },
      { id: 'electrolytes-hydration', label: 'Electrolytes & Hydration', keywords: ['electrolyte', 'hydration', 'sport drink', 'powdered beverage', 'sodium', 'potassium (sport)', 'magnesium (sport)', 'electrolyte drink', 'hydration powder', 'low carb electrolytes', 'endurance gel', 'hydration tablet'] },
      { id: 'weight-loss-sports', label: 'Weight Loss for Sports', keywords: ['fat burner', 'thermogenic', 'appetite suppressant (sports)', 'caffeine (sports)', 'fat loss', 'stimulant fat burner', 'non-stimulant fat burner', 'weight loss supplement'] },
      { id: 'protein-snacks-bars', label: 'Protein Snacks & Bars', keywords: ['protein bar', 'high protein bar', 'protein snack', 'low carb bar', 'protein ball', 'protein crisp', 'protein cookie', 'protein ball', 'high carb bar', 'energy bar'] },
      { id: 'mass-gainers', label: 'Mass Gainers', keywords: ['mass gainer', 'weight gainer', 'high calorie', 'bulking', 'mass builder', 'mass gainer powder'] },
    ],
  },
  {
    id: 'personal-care-beauty',
    label: 'Personal Care & Beauty',
    keywords: ['shampoo', 'conditioner', 'hair', 'body wash', 'soap', 'hand wash', 'toothpaste', 'toothbrush', 'deodorant', 'antiperspirant', 'body lotion', 'hand cream', 'lip balm', 'mouthwash', 'floss', 'shave', 'shaving cream', 'razor', 'hair colour', 'dye', 'bleach', 'hair styler', 'hair dryer', 'straightener', 'curling', 'skincare', 'moisturiser', 'cleanser', 'serum', 'sunscreen', 'spf', 'makeup', 'cosmetic', 'beauty', 'nail', 'nail polish', 'perfume', 'fragrance', 'essential oil', 'aromatherapy', 'personal care', 'beauty product', 'cosmetics', 'hair care', 'oral care', 'bath & body', 'toothpaste', 'toothbrush', 'shampoo', 'conditioner', 'face wash', 'moisturiser', 'serum', 'face cream', 'face oil', 'face mask', 'face scrub', 'toner', 'eye cream', 'lip balm', 'lip ointment', 'deodorant', 'hand sanitizer', 'hand sanitiser', 'face wipes', 'body scrub', 'bath salt', 'body oil', 'body lotion', 'body moisturiser', 'hair treatment', 'hair serum', 'hair oil', 'scalp treatment', 'dandruff', 'hair loss (care)', 'thinning hair', 'styling product', 'hair gel', 'hair mousse', 'hair wax', 'pomade', 'hair spray', 'beard oil', 'beard trimmer', 'shaving cream', 'aftershave'],
    subcategories: [
      { id: 'hair-care', label: 'Hair Care', keywords: ['shampoo', 'conditioner', 'hair mask', 'hair treatment', 'hair oil', 'hair serum', 'hair spray', 'gel', 'mousse', 'wax', 'pomade', 'hair colour', 'hair dye', 'bleach', 'perm', 'relaxer', 'hairbrush', 'comb', 'scalp treatment', 'dandruff', 'hair loss (care)', 'thinning hair', 'hair care product', 'conditioner', 'hair shampoo', 'hair cleanser'] },
      { id: 'bath-body', label: 'Bath & Body', keywords: ['body wash', 'soap', 'hand wash', 'body lotion', 'body cream', 'hand cream', 'lip balm', 'body scrub', 'bath salt', 'bath bomb', 'shower gel', 'body care', 'body oil', 'body balm', 'body moisturiser', 'bath & body'] },
      { id: 'oral-care', label: 'Oral Care', keywords: ['toothpaste', 'toothbrush', 'electric toothbrush', 'mouthwash', 'mouth rinse', 'floss', 'dental floss', 'interdental', 'tongue scraper', 'water flosser', 'oral irrigator', 'denture', 'tooth powder', 'tooth gel', 'teeth whitening', 'natural toothpaste', 'toothpaste tablet'] },
      { id: 'deodorants', label: 'Deodorants & Antiperspirants', keywords: ['deodorant', 'antiperspirant', 'roll-on', 'spray', 'stick', 'natural deodorant'] },
      { id: 'mens-grooming', label: "Men's Grooming", keywords: ["men's grooming", 'shaving cream', 'shaving gel', 'razor', 'electric shaver', 'beard oil', 'beard trimmer', 'mens hair', 'aftershave', 'beard care', 'shave cream'] },
      { id: 'skincare', label: 'Skin Care', keywords: ['skincare', 'face wash', 'cleanser', 'moisturiser', 'face cream', 'serum', 'sunscreen', 'spf', 'toner', 'exfoliator', 'mask', 'acne', 'pimple', 'anti-aging', 'anti-age', 'retinol', 'vitamin c serum', 'hyaluronic', 'niacinamide', 'benzoyl peroxide', 'salicylic', 'skin care', 'face care', 'acne treatment', 'anti-aging', 'anti-age', 'face moisturiser', 'face cleanser', 'face serum', 'face mask', 'face wash', 'toner', 'exfoliating scrub', 'face scrub', 'face wipes', 'eye cream', 'night cream', 'day cream', 'face oil', 'skin care mask', 'acne control', 'skin balm', 'skin supplement'] },
      { id: 'makeup-beauty', label: 'Makeup & Beauty', keywords: ['makeup', 'mascara', 'lipstick', 'foundation', 'concealer', 'eyeshadow', 'eyeliner', 'blush', 'bronzer', 'powder', 'makeup remover', 'cosmetic', 'beauty', 'nail polish', 'nail care', 'false eyelash', 'beauty tool', 'brush', 'sponge', 'cosmetics', 'eyebrow', 'eyebrow pencil', 'eyebrow enhancer', 'lip gloss', 'lip balm', 'makeup remover', 'beauty collagen'] },
      { id: 'sun-care', label: 'Sun Care', keywords: ['sunscreen', 'sun block', 'spf', 'sun care', 'tanning oil', 'after sun', 'uv protection', 'sunscreen lotion', 'natural sunscreen'] },
      { id: 'fragrances', label: 'Fragrances', keywords: ['perfume', 'fragrance', 'eau de parfum', 'eau de toilette', 'cologne', 'body spray', 'essential oil', 'aromatherapy', 'diffuser oil', 'incense', 'smudge stick'] },
    ],
  },
  {
    id: 'natural-grocery',
    label: 'Natural Grocery',
    keywords: ['grocery', 'food', 'tea', 'coffee', 'snack', 'bar', 'superfood', 'greens', 'spirulina', 'chlorella', 'wheatgrass', 'barley grass', 'honey', 'maple syrup', 'sweetener', 'oil', 'vinegar', 'condiment', 'cereal', 'muesli', 'granola', 'oats', 'oatmeal', 'quinoa', 'porridge', 'nut butter', 'spread', 'organic', 'raw', 'vegan', 'nuts', 'seeds', 'trail mix', 'puffed', 'clusters', 'cacao', 'chocolate', 'coconut', 'flour', 'meal', 'baking', 'dried fruit', 'fruit powder', 'berry powder', 'superfood blend', 'activated nuts', 'activated seeds', 'buckinis', 'protein balls', 'snack balls', 'cordial', 'hot chocolate', 'drinking chocolate', 'coffee creamer', 'tea', 'herbal tea', 'coconut chips', 'fruit & berry powder', 'flour & meals', 'pasta & rice', 'noodles', 'crackers', 'biscuits', 'cookies', 'lollies', 'candies', 'chocolate bars', 'dessert', 'dessert topping', 'sauce', 'jam', 'mustard', 'mayonnaise', 'salt', 'pepper', 'spices', 'seasoning', 'miso', 'dahl', 'couscous', 'quinoa', 'rice', 'pasta', 'noodles', 'soup', 'ready meals', 'bento box', 'lunch box'],
    subcategories: [
      { id: 'teas-herbal-drinks', label: 'Teas & Herbal Drinks', keywords: ['tea', 'herbal tea', 'green tea', 'black tea', 'white tea', 'rooibos', 'chai', 'matcha', 'cocoa', 'hot chocolate', 'drinking chocolate', 'coffee alternative', 'herbal drink', 'tea strainer', 'earl grey', 'english tea', 'herbal infusion'] },
      { id: 'healthy-snacks-bars', label: 'Healthy Snacks & Bars', keywords: ['snack', 'bar', 'energy bar', 'protein bar', 'muesli bar', 'trail mix', 'nut mix', 'dried fruit', 'kale chips', 'fruit snack', 'snack ball', 'protein ball', 'crisp', 'cracker', 'rice cake', 'popcorn', 'chips', 'puffed snacks', 'clusters', 'trail mix', 'nut snack', 'seed snack'] },
      { id: 'superfoods-greens', label: 'Superfoods & Greens', keywords: ['superfood', 'greens powder', 'spirulina', 'chlorella', 'wheatgrass', 'barley grass', 'beetroot', 'acai', 'goji berry', 'maca', 'cacao', 'raw food', 'superfood blend', 'greens blend', 'wheatgrass powder', 'barley grass powder', 'green powder', 'super greens'] },
      { id: 'natural-sweeteners', label: 'Natural Sweeteners', keywords: ['honey', 'maple syrup', 'molasses', 'stevia', 'xylitol', 'erythritol', 'monk fruit', 'coconut sugar', 'natural sweetener', 'sweetener', 'maple syrup', 'rice malt syrup'] },
      { id: 'healthy-oils-condiments', label: 'Healthy Oils & Condiments', keywords: ['oil', 'olive oil', 'coconut oil', 'avocado oil', 'flaxseed oil', 'fish oil (food)', 'vinegar', 'apple cider vinegar', 'balsamic', 'mustard', 'mayonnaise', 'healthy dressing', 'healthy oil', 'ghee', 'butter', 'nut oil', 'seed oil', 'avocado oil', 'coconut oil'] },
      { id: 'breakfast-cereals', label: 'Breakfast Foods', keywords: ['cereal', 'muesli', 'granola', 'oats', 'oatmeal', 'quinoa', 'porridge', 'breakfast bar', 'buckinis', 'puffed', 'clusters', 'cereal blend', 'muesli granola', 'breakfast cereal', 'healthy cereal'] },
      { id: 'nuts-seeds', label: 'Nuts & Seeds', keywords: ['nuts', 'almonds', 'walnuts', 'cashews', 'pecans', 'macadamias', 'brazil nuts', 'pistachios', 'seeds', 'pumpkin seeds', 'sunflower seeds', 'chia seeds', 'flax seeds', 'activated nuts', 'nut butter', 'seed butter', 'trail mix', 'mixed nuts', 'nut mix', 'seed mix', 'peanuts', 'nut butter', 'almond butter', 'pumpkin seeds', 'sunflower seeds', 'chia', 'flax'] },
    ],
  },
  {
    id: 'medical-pharmacy',
    label: 'Medical & Pharmacy Essentials',
    keywords: ['first aid', 'bandage', 'plaster', 'band-aid', 'antiseptic', 'antiseptic cream', 'iodine', 'betadine', 'wound', 'saline', 'medical', 'thermometer', 'blood pressure', 'bp monitor', 'glucose', 'diabetes', 'scale', 'bathroom scale', 'body scale', 'body composition', 'fitness tracker', 'pedometer', 'heart rate monitor', 'ecg', 'eeg', 'hearing aid', 'compression', 'support brace', 'knee brace', 'back brace', 'massager', 'tens', 'nebuliser', 'inhaler', 'spacer', 'covid test', 'rapid test', 'rat', 'pcr', 'mask', 'face mask', 'sanitiser', 'hand sanitizer', 'burn', 'blister', 'callus', 'corn', 'medical device', 'monitor', 'diabetic', 'mobility', 'aged care', 'ndis', 'nursing', 'home health', 'blood pressure monitor', 'bp machine', 'thermometer', 'fever', 'inhaler', 'spacer', 'face mask', 'surgical mask', 'n95', 'kn95', 'covid test', 'rapid antigen test', 'covid', 'influenza test', 'hand sanitiser', 'sanitiser', 'antiseptic', 'first aid kit'],
    subcategories: [
      { id: 'first-aid-wound-care', label: 'First Aid & Wound Care', keywords: ['first aid', 'bandage', 'plaster', 'band-aid', 'antiseptic', 'antiseptic cream', 'betadine', 'iodine', 'wound wash', 'saline', 'scissors', 'tape', 'gauze', 'cotton', 'cotton bud', 'steri-strip', 'gloves', 'mask', 'wound care', 'first aid kit', 'antiseptics', 'wound dressing'] },
      { id: 'medical-devices', label: 'Medical Devices', keywords: ['thermometer', 'blood pressure monitor', 'bp machine', 'pulse oximeter', 'oximeter', 'glucometer', 'glucose meter', 'blood glucose', 'scale', 'bathroom scale', 'body scale', 'body composition', 'fitness tracker', 'pedometer', 'heart rate monitor', 'ecg', 'eeg', 'medical device', 'health monitor', 'blood pressure', 'thermometer', 'pulse oximeter', 'blood glucose monitor'] },
      { id: 'mobility-support', label: 'Mobility & Support', keywords: ['compression garment', 'support brace', 'knee brace', 'back brace', 'ankle brace', 'wrist brace', 'elbow brace', 'mobility aid', 'walking stick', 'walker', 'wheelchair', 'mobility', 'support'] },
      { id: 'masks-tests', label: 'Masks & Tests', keywords: ['face mask', 'surgical mask', 'n95', 'kn95', 'covid test', 'rapid antigen test', 'rat', 'pcr', 'covid', 'influenza test', 'test kit', 'face mask', 'respirator'] },
      { id: 'personal-hygiene', label: 'Personal Hygiene', keywords: ['sanitiser', 'hand sanitizer', 'hand rub', 'alcohol gel', 'hand hygiene'] },
    ],
  },
  {
    id: 'baby-child',
    label: 'Baby & Children',
    keywords: ['baby', 'infant', 'toddler', 'child', 'formula', 'milk', 'nappy', 'diaper', 'wipes', 'baby food', 'puree', 'pablum', 'sunscreen (baby)', 'baby oil', 'baby wash', 'shampoo (baby)', 'bottle', 'teething', 'dummy', 'pacifier', 'stroller', 'pram', 'baby carrier', 'cot', 'high chair', 'children', 'kids', 'teen', 'childcare', 'baby formula', 'infant formula'],
    subcategories: [
      { id: 'baby-formula', label: 'Baby Formula', keywords: ['baby formula', 'infant formula', 'starter formula', 'follow-on formula', 'toddler formula', 'aptamil', 'nan', 'bellamy\'s organic', 'oli6', 'hipp', 'karicare', 's26', 'a2', 'a24', 'sustagen', 'pedialyte', 'baby milk', 'infant milk'] },
      { id: 'baby-food', label: 'Baby Food & Drinks', keywords: ['baby food', 'puree', 'pablum', 'rusks', 'teething biscuit', 'baby snack', 'fruit pouch', 'veggie pouch', 'baby snack', 'baby food pouch'] },
      { id: 'nappies-wipes', label: 'Nappies & Wipes', keywords: ['nappy', 'diaper', 'wet wipe', 'baby wipe', 'nappy rash', 'nappy cream', 'nappies', 'baby wipes'] },
      { id: 'baby-care', label: 'Baby Care', keywords: ['baby oil', 'baby wash', 'baby shampoo', 'baby lotion', 'sunscreen (baby)', 'nasal aspirator', 'thermometer (baby)', 'teething', 'dummy', 'pacifier', 'bottle', 'steriliser', 'baby care', 'baby products', 'infant care'] },
      { id: 'childrens-health', label: "Children's Health", keywords: ['children\'s health', 'kids health', 'child vitamins', 'infant pain relief', 'children\'s cold', 'kids allergy', 'kids supplement', 'children\'s health'] },
    ],
  },
  // Note: The classification will always match at least one category above.
]