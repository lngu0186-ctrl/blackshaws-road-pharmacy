// Shopify Storefront API Service

// Shopify Storefront API Configuration
const SHOPIFY_API_VERSION = '2025-07'
const SHOPIFY_STORE_PERMANENT_DOMAIN = 'blackshaws-road-pharmacy.myshopify.com'
const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`
const SHOPIFY_STOREFRONT_TOKEN = '7049490ac9a0923d80e14dbe95587f54'

// ─── Types ───────────────────────────────────────────────────────
export interface ShopifyProduct {
  id: string
  handle: string
  title: string
  description: string
  descriptionHtml?: string
  productType: string
  vendor: string
  tags: string[]
  publishedAt: string
  updatedAt: string
  images: {
    edges: {
      node: {
        url: string
        altText: string
        width?: number
        height?: number
      }
    }[]
  }
  variants: {
    edges: {
      node: {
        id: string
        title: string
        sku: string
        availableForSale: boolean
        price: {
          amount: string
          currencyCode: string
        }
        compareAtPrice?: {
          amount: string
          currencyCode: string
        }
        selectedOptions: { name: string; value: string }[]
        image?: {
          url: string
          altText: string
          width: number
          height: number
        }
      }
    }[]
  }
  priceRange: {
    minVariantPrice: {
      amount: string
      currencyCode: string
    }
    maxVariantPrice: {
      amount: string
      currencyCode: string
    }
  }
  collections: {
    edges: {
      node: {
        id: string
        title: string
        handle: string
      }
    }[]
  }
  options?: {
    name: string
    values: string[]
  }[]
}

export type Product = ShopifyProduct

// ─── Storefront API Helper ──────────────────────────────────────
export async function storefrontApiRequest(query: string, variables: Record<string, unknown> = {}) {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  })

  if (response.status === 402) {
    console.error('Shopify: Payment required — your store needs an active billing plan.')
    return null
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data = await response.json()

  if (data.errors) {
    throw new Error(`Shopify API error: ${data.errors.map((e: { message: string }) => e.message).join(', ')}`)
  }

  return data
}

// ─── Product Queries ────────────────────────────────────────────
const GET_ALL_PRODUCTS = `
  query getAllProducts($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          handle
          title
          description
          descriptionHtml
          productType
          vendor
          tags
          publishedAt
          updatedAt
          images(first: 10) {
            edges {
              node {
                url
                altText
                width
                height
              }
            }
          }
          variants(first: 100) {
            edges {
              node {
                id
                title
                sku
                availableForSale
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
                selectedOptions {
                  name
                  value
                }
                image {
                  url
                  altText
                  width
                  height
                }
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          collections(first: 10) {
            edges {
              node {
                id
                title
                handle
              }
            }
          }
        }
      }
    }
  }
`

const GET_PRODUCT_BY_HANDLE = `
  query getProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      description
      descriptionHtml
      productType
      vendor
      tags
      publishedAt
      updatedAt
      images(first: 10) {
        edges {
          node {
            url
            altText
            width
            height
          }
        }
      }
      variants(first: 100) {
        edges {
          node {
            id
            title
            sku
            availableForSale
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
            image {
              url
              altText
              width
              height
            }
          }
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      collections(first: 10) {
        edges {
          node {
            id
            title
            handle
          }
        }
      }
      options {
        name
        values
      }
    }
  }
`

// ─── Product Functions ──────────────────────────────────────────
export async function getAllProducts(): Promise<ShopifyProduct[]> {
  const allProducts: ShopifyProduct[] = []
  let hasNextPage = true
  let endCursor: string | null = null

  while (hasNextPage) {
    const data = await storefrontApiRequest(GET_ALL_PRODUCTS, {
      first: 250,
      after: endCursor,
    })

    if (!data) return allProducts

    const products = data.data.products
    allProducts.push(...products.edges.map((edge: { node: ShopifyProduct }) => edge.node))
    hasNextPage = products.pageInfo.hasNextPage
    endCursor = products.pageInfo.endCursor
  }

  return allProducts
}

export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const data = await storefrontApiRequest(GET_PRODUCT_BY_HANDLE, { handle })
  if (!data) return null
  return data.data.product
}

// ─── Cart Queries & Mutations ───────────────────────────────────
export const CART_QUERY = `
  query cart($id: ID!) {
    cart(id: $id) { id totalQuantity }
  }
`

export const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        lines(first: 100) { edges { node { id merchandise { ... on ProductVariant { id } } } } }
      }
      userErrors { field message }
    }
  }
`

export const CART_LINES_ADD_MUTATION = `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        lines(first: 100) { edges { node { id merchandise { ... on ProductVariant { id } } } } }
      }
      userErrors { field message }
    }
  }
`

export const CART_LINES_UPDATE_MUTATION = `
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { id }
      userErrors { field message }
    }
  }
`

export const CART_LINES_REMOVE_MUTATION = `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { id }
      userErrors { field message }
    }
  }
`
