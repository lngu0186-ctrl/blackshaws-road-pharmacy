import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { X, Plus, Minus, Trash2, ShoppingBag, ExternalLink, Loader2 } from 'lucide-react'
import { useCartStore } from '../stores/cartStore'
import { Button } from './ui/Button'

export default function CartDrawer() {
  const { items, isLoading, isSyncing, isCartOpen, lastError, clearError, updateQuantity, removeItem, getCheckoutUrl, closeCart, syncCart } = useCartStore()

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + parseFloat(item.price.amount) * item.quantity, 0)
  const currency = items[0]?.price.currencyCode || 'AUD'

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden'
      clearError()
      syncCart()
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => { document.body.style.overflow = 'auto' }
  }, [isCartOpen, clearError, syncCart])

  if (!isCartOpen) return null

  const formatPrice = (amount: string, currencyCode: string) =>
    new Intl.NumberFormat('en-AU', { style: 'currency', currency: currencyCode }).format(parseFloat(amount))

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl()
    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank')
      closeCart()
    }
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--color-gray-200)' }}>
          <h2 className="text-xl font-serif font-bold" style={{ color: 'var(--color-navy)' }}>
            Your Cart ({totalItems})
          </h2>
          <button onClick={closeCart} className="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Close cart">
            <X className="w-5 h-5" style={{ color: 'var(--color-gray-600)' }} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {lastError ? (
            <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {lastError}
            </div>
          ) : null}
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 mx-auto mb-4 opacity-30" style={{ color: 'var(--color-gray-300)' }} />
              <p className="text-[var(--color-gray-600)] mb-6">Your cart is empty</p>
              <Button variant="primary" asChild>
                <Link to="/shop" onClick={closeCart}>Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => {
                const imageUrl = item.product.images?.edges[0]?.node?.url
                return (
                  <div key={item.variantId} className="flex gap-4 p-4 rounded-xl border" style={{ borderColor: 'var(--color-gray-200)' }}>
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      {imageUrl && (
                        <img
                          src={imageUrl.startsWith('//') ? `https:${imageUrl}` : imageUrl}
                          alt={item.product.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div>
                        <h4 className="font-semibold text-sm leading-tight mb-1" style={{ color: 'var(--color-navy)' }}>
                          <Link to={`/shop/${item.product.handle}`} onClick={closeCart} className="hover:underline">
                            {item.product.title}
                          </Link>
                        </h4>
                        <p className="text-xs text-[var(--color-gray-600)]">
                          {item.selectedOptions.map((o) => o.value).join(' • ')}
                        </p>
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center border rounded-lg">
                          <button onClick={() => updateQuantity(item.variantId, item.quantity - 1)} className="px-2 py-1 hover:bg-gray-100 transition-colors">
                            <Minus className="w-3 h-3" style={{ color: 'var(--color-gray-600)' }} />
                          </button>
                          <span className="px-3 text-sm font-medium" style={{ color: 'var(--color-navy)' }}>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.variantId, item.quantity + 1)} className="px-2 py-1 hover:bg-gray-100 transition-colors">
                            <Plus className="w-3 h-3" style={{ color: 'var(--color-gray-600)' }} />
                          </button>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold" style={{ color: 'var(--color-navy)' }}>
                            {formatPrice(item.price.amount, item.price.currencyCode)}
                          </span>
                          <button onClick={() => removeItem(item.variantId)} className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors" aria-label="Remove item">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t px-6 py-4" style={{ borderColor: 'var(--color-gray-200)' }}>
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium" style={{ color: 'var(--color-text-dark)' }}>Subtotal</span>
              <span className="text-xl font-bold" style={{ color: 'var(--color-navy)' }}>
                {formatPrice(totalPrice.toString(), currency)}
              </span>
            </div>
            <p className="text-xs text-[var(--color-gray-600)] mb-4">
              Shipping and taxes calculated at checkout.
            </p>
            {/* TGA / health disclaimer */}
            <p className="text-xs text-gray-500 mb-4 leading-relaxed">
              <strong>Therapeutic Goods:</strong> Always read the label and follow directions for use. 
              Consult your healthcare practitioner if symptoms persist.
            </p>
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={handleCheckout}
              disabled={isLoading || isSyncing}
            >
              {isLoading || isSyncing ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <ExternalLink className="w-4 h-4 mr-2" />
              )}
              Checkout with Shopify
            </Button>
          </div>
        )}
      </div>
    </>
  )
}
