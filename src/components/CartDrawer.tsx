import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { Button } from './ui/Button'

export default function CartDrawer() {
  const { state, closeCart, removeItem, updateItem, isCartOpen, checkoutUrl } = useCart()

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isCartOpen])

  if (!isCartOpen) return null

  const formatPrice = (amount: string, currencyCode: string) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: currencyCode,
    }).format(parseFloat(amount))
  }

  const cartItems = state.cart?.lines?.edges || []
  const subtotal = state.cart?.cost?.totalAmount?.amount || '0'
  const currency = state.cart?.cost?.totalAmount?.currencyCode || 'AUD'

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={closeCart}
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b"
          style={{ borderColor: 'var(--color-gray-200)' }}
        >
          <h2 className="text-xl font-serif font-bold" style={{ color: 'var(--color-navy)' }}>
            Your Cart ({state.cartCount})
          </h2>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" style={{ color: 'var(--color-gray-600)' }} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 mx-auto mb-4 opacity-30" style={{ color: 'var(--color-gray-300)' }} />
              <p className="text-[var(--color-gray-600)] mb-6">Your cart is empty</p>
              <Button variant="primary" asChild>
                <Link to="/shop" onClick={closeCart}>
                  Continue Shopping
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map(({ node }: any) => (
                <div
                  key={node.id}
                  className="flex gap-4 p-4 rounded-xl border"
                  style={{ borderColor: 'var(--color-gray-200)' }}
                >
                  {/* Product Image */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    {node.merchandise.product?.images?.edges[0]?.node?.url && (
                      <img
                        src={node.merchandise.product.images.edges[0].node.url.replace(/^\/\//, 'https://')}
                        alt={node.merchandise.product.images.edges[0].node.altText || node.merchandise.product.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col">
                    <div>
                      <h4 className="font-semibold text-sm leading-tight mb-1" style={{ color: 'var(--color-navy)' }}>
                        <Link
                          to={`/shop/${node.merchandise.product.handle}`}
                          onClick={closeCart}
                          className="hover:underline"
                        >
                          {node.merchandise.product.title}
                        </Link>
                      </h4>
                      <p className="text-xs text-[var(--color-gray-600)]">
                        {node.merchandise.title}
                      </p>
                    </div>

                    <div className="mt-auto flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center border rounded-lg">
                        <button
                          onClick={() => updateItem(node.id, node.quantity - 1)}
                          className="px-2 py-1 hover:bg-gray-100 transition-colors"
                        >
                          <Minus className="w-3 h-3" style={{ color: 'var(--color-gray-600)' }} />
                        </button>
                        <span className="px-3 text-sm font-medium" style={{ color: 'var(--color-navy)' }}>
                          {node.quantity}
                        </span>
                        <button
                          onClick={() => updateItem(node.id, node.quantity + 1)}
                          className="px-2 py-1 hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="w-3 h-3" style={{ color: 'var(--color-gray-600)' }} />
                        </button>
                      </div>

                      {/* Price & Remove */}
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold" style={{ color: 'var(--color-navy)' }}>
                          {formatPrice(node.merchandise.price.amount, node.merchandise.price.currencyCode)}
                        </span>
                        <button
                          onClick={() => removeItem(node.id)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t px-6 py-4" style={{ borderColor: 'var(--color-gray-200)' }}>
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium" style={{ color: 'var(--color-text-dark)' }}>Subtotal</span>
              <span className="text-xl font-bold" style={{ color: 'var(--color-navy)' }}>
                {formatPrice(subtotal, currency)}
              </span>
            </div>
            <p className="text-xs text-[var(--color-gray-600)] mb-4">
              Shipping and taxes calculated at checkout.
            </p>
            {checkoutUrl && (
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                asChild
              >
                <a href={checkoutUrl} target="_blank" rel="noopener noreferrer">
                  Proceed to Checkout
                </a>
              </Button>
            )}
          </div>
        )}
      </div>
    </>
  )
}
