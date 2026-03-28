import { GraphQLClient, gql } from 'graphql-request'

const domain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN
const token = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN

if (!domain || !token) {
  throw new Error('Shopify Storefront API credentials not found in environment variables')
}

const endpoint = `https://${domain}/api/2024-01/graphql.json`

const client = new GraphQLClient(endpoint, {
  headers: {
    'X-Shopify-Storefront-Access-Token': token,
  },
})

// GraphQL Queries
const GET_ALL_PRODUCTS = gql`
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

const GET_PRODUCT_BY_HANDLE = gql`
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
    }
  }
`

const CREATE_CART = gql`
  mutation createCart {
    cartCreate {
      cart {
        id
        checkoutUrl
      }
    }
  }
`

const ADD_TO_CART = gql`
  mutation addToCart($cartId: ID!, $variantId: ID!, $quantity: Int!) {
    cartLinesAdd(cartId: $cartId, lines: [{ merchandiseId: $variantId, quantity: $quantity }]) {
      cart {
        id
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    title
                    handle
                    images(first: 1) {
                      edges {
                        node {
                          url
                          altText
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          totalQuantity
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`

const REMOVE_FROM_CART = gql`
  mutation removeFromCart($cartId: ID!, $lineItemId: ID!) {
    cartLinesRemove(cartId: $cartId, lineIds: [$lineItemId]) {
      cart {
        id
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    title
                    handle
                    images(first: 1) {
                      edges {
                        node {
                          url
                          altText
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          totalQuantity
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`

const UPDATE_CART_ITEM = gql`
  mutation updateCartItem($cartId: ID!, $lineItemId: ID!, $quantity: Int!) {
    cartLinesUpdate(cartId: $cartId, lines: [{ id: $lineItemId, quantity: $quantity }]) {
      cart {
        id
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    title
                    handle
                    images(first: 1) {
                      edges {
                        node {
                          url
                          altText
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          totalQuantity
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`

const GET_CART = gql`
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      id
      lines(first: 100) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                price {
                  amount
                  currencyCode
                }
                product {
                  title
                  handle
                  images(first: 1) {
                    edges {
                      node {
                        url
                        altText
                      }
                    }
                  }
                }
              }
            }
          }
        }
        totalQuantity
      }
      cost {
        totalAmount {
          amount
          currencyCode
        }
      }
      checkoutUrl
    }
  }
`

export interface CartLineItem {
  id: string
  quantity: number
  merchandise: {
    id: string
    title: string
    price: {
      amount: string
      currencyCode: string
    }
    product: {
      title: string
      handle: string
      images: {
        edges: {
          node: {
            url: string
            altText: string
          }
        }[]
      }
    }
  }
}

export interface Cart {
  id: string
  lines: {
    edges: CartLineItem[]
  }
  totalQuantity: number
  cost: {
    totalAmount: {
      amount: string
      currencyCode: string
    }
  }
  checkoutUrl: string
}

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
}

export type Product = ShopifyProduct

export async function getAllProducts(): Promise<ShopifyProduct[]> {
  try {
    const allProducts: ShopifyProduct[] = []
    let hasNextPage = true
    let endCursor: string | null = null
    const pageSize = 250

    while (hasNextPage) {
      const variables = { first: pageSize, after: endCursor } as { first: number; after: string | null }
      const data = await client.request<{ products: { edges: { node: ShopifyProduct }[]; pageInfo: { hasNextPage: boolean; endCursor: string | null } } }>(GET_ALL_PRODUCTS, variables)
      
      allProducts.push(...data.products.edges.map((edge): ShopifyProduct => edge.node))
      hasNextPage = data.products.pageInfo.hasNextPage
      endCursor = data.products.pageInfo.endCursor
    }

    return allProducts
  } catch (error) {
    console.error('Shopify getAllProducts error:', error)
    throw error
  }
}

export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  try {
    const data = await client.request<{ product: ShopifyProduct }>(GET_PRODUCT_BY_HANDLE, { handle })
    return data.product
  } catch (error) {
    console.error('Shopify getProductByHandle error:', error)
    throw error
  }
}

export async function createCart(): Promise<Cart> {
  try {
    const data = await client.request<{ cartCreate: { cart: Cart } }>(CREATE_CART)
    return data.cartCreate.cart
  } catch (error) {
    console.error('Shopify createCart error:', error)
    throw error
  }
}

export async function addToCart(cartId: string, variantId: string, quantity: number = 1): Promise<Cart> {
  try {
    const data = await client.request<{ cartLinesAdd: { cart: Cart; userErrors: { field: string; message: string }[] } }>(ADD_TO_CART, {
      cartId,
      variantId,
      quantity,
    })
    if (data.cartLinesAdd.userErrors?.length > 0) {
      throw new Error(data.cartLinesAdd.userErrors[0].message)
    }
    return data.cartLinesAdd.cart
  } catch (error) {
    console.error('Shopify addToCart error:', error)
    throw error
  }
}

export async function removeFromCart(cartId: string, lineItemId: string): Promise<Cart> {
  try {
    const data = await client.request<{ cartLinesRemove: { cart: Cart; userErrors: { field: string; message: string }[] } }>(REMOVE_FROM_CART, {
      cartId,
      lineItemId,
    })
    if (data.cartLinesRemove.userErrors?.length > 0) {
      throw new Error(data.cartLinesRemove.userErrors[0].message)
    }
    return data.cartLinesRemove.cart
  } catch (error) {
    console.error('Shopify removeFromCart error:', error)
    throw error
  }
}

export async function updateCartItem(cartId: string, lineItemId: string, quantity: number): Promise<Cart> {
  try {
    const data = await client.request<{ cartLinesUpdate: { cart: Cart; userErrors: { field: string; message: string }[] } }>(UPDATE_CART_ITEM, {
      cartId,
      lineItemId,
      quantity,
    })
    if (data.cartLinesUpdate.userErrors?.length > 0) {
      throw new Error(data.cartLinesUpdate.userErrors[0].message)
    }
    return data.cartLinesUpdate.cart
  } catch (error) {
    console.error('Shopify updateCartItem error:', error)
    throw error
  }
}

export async function getCart(cartId: string): Promise<Cart> {
  try {
    const data = await client.request<{ cart: Cart }>(GET_CART, { cartId })
    return data.cart
  } catch (error) {
    console.error('Shopify getCart error:', error)
    throw error
  }
}

export { client }
