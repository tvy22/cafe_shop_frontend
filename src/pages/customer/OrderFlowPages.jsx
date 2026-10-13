import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock3,
  CreditCard,
  Minus,
  Plus,
  Printer,
  ShoppingBag,
  Trash2,
} from 'lucide-react'
import { useCart } from '../../context/useCart'
import CafeFooter from '../../components/customer/CafeFooter'

const money = (amount) => `$${amount.toFixed(2)}`
function formatDate(value) {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? '' : date.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
}

function CustomizationSummary({ customization }) {
  if (!customization) return null

  const details = [
    customization.sweetness && `Sweetness ${customization.sweetness}`,
    customization.toppings?.length && `Toppings: ${customization.toppings.join(', ')}`,
    customization.note && `Note: ${customization.note}`,
  ].filter(Boolean)

  return details.length ? <p className="mt-1 text-xs leading-5 text-[#5c5346]">{details.join(' · ')}</p> : null
}
const steps = [
  { label: 'Cart', path: '/cart' },
  { label: 'Review', path: '/order' },
  { label: 'Payment', path: '/payment' },
]

function FlowLayout({ activeStep, title, description, children }) {
  const { itemCount } = useCart()

  return (
    <div className="min-h-screen bg-[#f3f0e8] text-[#2c2117] print:min-h-0 print:bg-white">
      <div className="print-hidden border-b border-[#2c2117]/10 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <Link to="/" className="flex items-center gap-2.5 font-semibold" aria-label="RUPP Cafe home">
            <span className="grid size-9 place-items-center rounded-full bg-[#8ea86e] text-sm font-bold text-white">R</span>
            <span>RUPP <span className="font-normal text-[#5c5346]">Cafe</span></span>
          </Link>
          <Link
            to="/cart"
            className="relative grid size-10 place-items-center rounded-full border border-[#2c2117]/15 transition hover:bg-[#f3f0e8]"
            aria-label={`View cart, ${itemCount} items`}
            title="View cart"
          >
            <ShoppingBag size={18} />
            <span className="absolute -right-1 -top-1 grid min-w-5 place-items-center rounded-full bg-[#b5502e] px-1 text-xs leading-5 text-white">{itemCount}</span>
          </Link>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-5 pb-16 pt-8 sm:px-8 sm:pt-12 print:max-w-none print:px-0 print:pb-0 print:pt-0">
        <nav aria-label="Checkout progress" className="print-hidden mb-8 flex items-center gap-2 text-sm">
          {steps.map((step, index) => (
            <div key={step.path} className="flex items-center gap-2">
              {index > 0 && <span className="h-px w-5 bg-[#2c2117]/20 sm:w-10" aria-hidden="true" />}
              <span className={`flex items-center gap-2 ${index === activeStep ? 'font-semibold text-[#3f6b45]' : 'text-[#5c5346]'}`} aria-current={index === activeStep ? 'step' : undefined}>
                <span className={`grid size-7 place-items-center rounded-full border text-xs ${index < activeStep ? 'border-[#62815a] bg-[#62815a] text-white' : index === activeStep ? 'border-[#62815a] bg-white text-[#3f6b45]' : 'border-[#2c2117]/20 bg-white'}`}>
                  {index < activeStep ? <Check size={14} /> : index + 1}
                </span>
                <span className="hidden sm:inline">{step.label}</span>
              </span>
            </div>
          ))}
        </nav>

        <div className="print-hidden mb-8 max-w-2xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#b5502e]">RUPP Cafe · Order ahead</p>
          <h1 className="font-serif text-3xl font-semibold leading-tight sm:text-4xl">{title}</h1>
          {description && <p className="mt-3 max-w-xl leading-7 text-[#5c5346]">{description}</p>}
        </div>
        {children}
      </main>
      <CafeFooter />
    </div>
  )
}

function OrderSummary({ action, actionLabel, disabled = false, submit = false }) {
  const { subtotal, tax, total } = useCart()

  return (
    <aside className="h-fit rounded-lg border border-[#2c2117]/10 bg-white p-5 sm:p-6">
      <h2 className="text-lg font-semibold">Order total</h2>
      <div className="mt-5 space-y-3 border-b border-[#2c2117]/10 pb-5 text-sm text-[#5c5346]">
        <div className="flex justify-between gap-4"><span>Subtotal</span><span className="font-medium text-[#2c2117]">{money(subtotal)}</span></div>
        <div className="flex justify-between gap-4"><span>Estimated tax (10%)</span><span className="font-medium text-[#2c2117]">{money(tax)}</span></div>
        <div className="flex justify-between gap-4"><span>Pickup</span><span className="font-medium text-[#2c2117]">Free</span></div>
      </div>
      <div className="flex justify-between py-5 text-base font-semibold"><span>Total</span><span>{money(total)}</span></div>
      {(action || submit) && (
        <button
          type={submit ? 'submit' : 'button'}
          onClick={action}
          disabled={disabled}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-[#62815a] px-4 py-3 font-semibold text-white transition hover:bg-[#4d6d47] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {actionLabel}<ArrowRight size={17} />
        </button>
      )}
      <p className="mt-3 text-center text-xs leading-5 text-[#5c5346]">Taxes are estimated for this demo checkout.</p>
    </aside>
  )
}

function EmptyCart() {
  return (
    <div className="rounded-lg border border-dashed border-[#2c2117]/20 bg-white px-6 py-14 text-center">
      <ShoppingBag className="mx-auto text-[#62815a]" size={32} />
      <h2 className="mt-4 text-xl font-semibold">Your cart is taking a coffee break</h2>
      <p className="mt-2 text-sm text-[#5c5346]">Add something from the menu and it will show up here.</p>
      <Link to="/#menu" className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#62815a] px-5 py-3 text-sm font-semibold text-white hover:bg-[#4d6d47]">
        Browse the menu<ArrowRight size={16} />
      </Link>
    </div>
  )
}

export function CartPage() {
  const { cart, setItemQuantity, removeFromCart, itemCount } = useCart()
  const navigate = useNavigate()

  return (
    <FlowLayout activeStep={0} title="Your cart" description="A good coffee break starts here. Review your drinks before checkout.">
      {!cart.length ? <EmptyCart /> : (
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <section className="rounded-lg border border-[#2c2117]/10 bg-white p-4 sm:p-6" aria-label="Items in your cart">
            <div className="mb-4 flex items-center justify-between border-b border-[#2c2117]/10 pb-4">
              <h2 className="font-semibold">Your drinks</h2>
              <span className="text-sm text-[#5c5346]">{itemCount} {itemCount === 1 ? 'item' : 'items'}</span>
            </div>
            <ul className="divide-y divide-[#2c2117]/10">
              {cart.map((item) => (
                <li key={item.id} className="flex gap-4 py-5 first:pt-1 last:pb-1">
                  <img src={item.image} alt="" className="size-20 shrink-0 rounded-md object-cover sm:size-24" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="mt-1 text-sm leading-5 text-[#5c5346]">{item.description}</p>
                        <CustomizationSummary customization={item.customization} />
                      </div>
                      <span className="font-semibold">{money(item.price * item.quantity)}</span>
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <div className="flex items-center rounded-md border border-[#2c2117]/15">
                        <button type="button" onClick={() => setItemQuantity(item.id, item.quantity - 1)} className="grid size-9 place-items-center hover:bg-[#f3f0e8]" aria-label={`Decrease ${item.name} quantity`}><Minus size={15} /></button>
                        <span className="w-8 text-center text-sm" aria-live="polite">{item.quantity}</span>
                        <button type="button" onClick={() => setItemQuantity(item.id, item.quantity + 1)} className="grid size-9 place-items-center hover:bg-[#f3f0e8]" aria-label={`Increase ${item.name} quantity`}><Plus size={15} /></button>
                      </div>
                      <button type="button" onClick={() => removeFromCart(item.id)} className="inline-flex items-center gap-1.5 text-sm text-[#9d4127] hover:underline" aria-label={`Remove ${item.name}`}><Trash2 size={15} />Remove</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <Link to="/#menu" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#4d6d47] hover:underline"><ArrowLeft size={16} />Continue shopping</Link>
          </section>
          <OrderSummary action={() => navigate('/order')} actionLabel="Review order" />
        </div>
      )}
    </FlowLayout>
  )
}

export function ReviewOrderPage() {
  const { cart, checkoutDetails, setCheckoutDetails, subtotal, tax, total } = useCart()
  const navigate = useNavigate()

  function updateField(event) {
    const { name, value } = event.target
    setCheckoutDetails((details) => ({ ...details, [name]: value }))
  }

  if (!cart.length) return <FlowLayout activeStep={1} title="Review your order"><EmptyCart /></FlowLayout>

  return (
    <FlowLayout activeStep={1} title="Review your order" description="Add your pickup details and make sure everything looks right.">
      <form onSubmit={(event) => { event.preventDefault(); navigate('/payment') }} className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-6">
          <section className="rounded-lg border border-[#2c2117]/10 bg-white p-5 sm:p-6">
            <h2 className="text-lg font-semibold">Pickup details</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-medium">Name for the order
                <input required name="name" value={checkoutDetails.name} onChange={updateField} autoComplete="name" placeholder="Your name" className="mt-2 block w-full rounded-md border border-[#2c2117]/20 bg-white px-3 py-3 font-normal outline-none focus:border-[#62815a] focus:ring-2 focus:ring-[#62815a]/20" />
              </label>
              <label className="text-sm font-medium">Email for receipt
                <input required type="email" name="email" value={checkoutDetails.email} onChange={updateField} autoComplete="email" placeholder="you@example.com" className="mt-2 block w-full rounded-md border border-[#2c2117]/20 bg-white px-3 py-3 font-normal outline-none focus:border-[#62815a] focus:ring-2 focus:ring-[#62815a]/20" />
              </label>
              <label className="text-sm font-medium sm:col-span-2">Pickup time
                <select name="pickupTime" value={checkoutDetails.pickupTime} onChange={updateField} className="mt-2 block w-full rounded-md border border-[#2c2117]/20 bg-white px-3 py-3 font-normal outline-none focus:border-[#62815a] focus:ring-2 focus:ring-[#62815a]/20">
                  <option>As soon as possible</option>
                  <option>In about 15 minutes</option>
                  <option>In about 30 minutes</option>
                </select>
              </label>
            </div>
          </section>
          <section className="rounded-lg border border-[#2c2117]/10 bg-white p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold">Order items</h2>
              <Link to="/cart" className="text-sm font-medium text-[#4d6d47] hover:underline">Edit cart</Link>
            </div>
            <ul className="mt-4 divide-y divide-[#2c2117]/10">
              {cart.map((item) => <li key={item.id} className="flex justify-between gap-4 py-3 text-sm"><div><span>{item.quantity} × {item.name}</span><CustomizationSummary customization={item.customization} /></div><span className="font-medium">{money(item.quantity * item.price)}</span></li>)}
            </ul>
          </section>
        </div>
        <div className="space-y-4">
          <OrderSummary submit actionLabel="Continue to payment" />
          <div className="sr-only" aria-live="polite">Subtotal {money(subtotal)}, tax {money(tax)}, total {money(total)}</div>
        </div>
      </form>
    </FlowLayout>
  )
}

export function PaymentPage() {
  const { cart, checkoutDetails, placeOrder, subtotal, tax, total } = useCart()
  const [paymentMethod, setPaymentMethod] = useState('online-demo')
  const navigate = useNavigate()

  if (!cart.length) return <FlowLayout activeStep={2} title="Payment"><EmptyCart /></FlowLayout>
  if (!checkoutDetails.name.trim() || !checkoutDetails.email.trim()) {
    return <Navigate to="/order" replace />
  }

  function submitOrder(event) {
    event.preventDefault()
    const order = placeOrder(paymentMethod)
    navigate(`/order-confirmation/${order.id}`)
  }

  return (
    <FlowLayout activeStep={2} title="Choose how to pay" description="Your order will be prepared for pickup at RUPP Cafe.">
      <form onSubmit={submitOrder} className="mx-auto grid w-full max-w-4xl items-start gap-4 md:grid-cols-[minmax(0,1fr)_280px]">
        <div className="space-y-4">
          <fieldset className="rounded-lg border border-[#2c2117]/10 bg-white p-4 sm:p-5">
            <legend className="px-1 text-base font-semibold">Payment method</legend>
            <div className="mt-2 space-y-2">
              <label className={`flex cursor-pointer items-start gap-3 rounded-md border p-3 transition ${paymentMethod === 'online-demo' ? 'border-[#62815a] bg-[#62815a]/5' : 'border-[#2c2117]/15 hover:bg-[#f3f0e8]'}`}>
                <input type="radio" name="paymentMethod" value="online-demo" checked={paymentMethod === 'online-demo'} onChange={(event) => setPaymentMethod(event.target.value)} className="mt-1 accent-[#62815a]" />
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#f3f0e8] text-[#4d6d47]"><CreditCard size={16} /></span>
                <span><span className="block text-sm font-semibold">Pay online (demo)</span><span className="mt-1 block text-xs leading-5 text-[#5c5346]">Simulated payment. No card details collected.</span></span>
              </label>
              <label className={`flex cursor-pointer items-start gap-3 rounded-md border p-3 transition ${paymentMethod === 'at-pickup' ? 'border-[#62815a] bg-[#62815a]/5' : 'border-[#2c2117]/15 hover:bg-[#f3f0e8]'}`}>
                <input type="radio" name="paymentMethod" value="at-pickup" checked={paymentMethod === 'at-pickup'} onChange={(event) => setPaymentMethod(event.target.value)} className="mt-1 accent-[#62815a]" />
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#f3f0e8] text-[#4d6d47]"><ShoppingBag size={16} /></span>
                <span><span className="block text-sm font-semibold">Pay at pickup</span><span className="mt-1 block text-xs leading-5 text-[#5c5346]">Pay at the counter when you collect your order.</span></span>
              </label>
            </div>
          </fieldset>
          <section className="rounded-lg border border-[#2c2117]/10 bg-white p-4 sm:p-5">
            <h2 className="text-sm font-semibold">Pickup details</h2>
            <p className="mt-2 text-sm text-[#5c5346]">For <span className="font-medium text-[#2c2117]">{checkoutDetails.name || 'Guest'}</span></p>
            <p className="mt-1 flex items-center gap-2 text-sm text-[#5c5346]"><Clock3 size={15} />{checkoutDetails.pickupTime}</p>
            <Link to="/order" className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-[#4d6d47] hover:underline"><ArrowLeft size={15} />Edit order</Link>
          </section>
        </div>
        <div>
          <section className="rounded-lg border border-[#2c2117]/10 bg-white p-4 sm:p-5">
            <h2 className="text-base font-semibold">Order total</h2>
            <div className="mt-3 space-y-2 border-b border-[#2c2117]/10 pb-3 text-sm text-[#5c5346]">
              <div className="flex justify-between"><span>Subtotal</span><span className="font-medium text-[#2c2117]">{money(subtotal)}</span></div>
              <div className="flex justify-between"><span>Estimated tax (10%)</span><span className="font-medium text-[#2c2117]">{money(tax)}</span></div>
              <div className="flex justify-between"><span>Pickup</span><span className="font-medium text-[#2c2117]">Free</span></div>
            </div>
            <div className="flex justify-between gap-3 py-3 text-sm font-semibold"><span>Due {paymentMethod === 'at-pickup' ? 'at pickup' : 'today'}</span><span>{money(total)}</span></div>
            <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-md bg-[#62815a] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4d6d47]">Place order<ArrowRight size={16} /></button>
            <p className="mt-2 text-center text-[11px] leading-4 text-[#5c5346]">Demo checkout only. No payment is processed.</p>
          </section>
        </div>
      </form>
    </FlowLayout>
  )
}

export function OrderConfirmationPage() {
  const { lastOrder } = useCart()

  return (
    <FlowLayout activeStep={3} title={lastOrder ? 'Order confirmed' : 'Order details'} description={lastOrder ? 'Thanks for ordering with us. Your coffee will be ready for pickup soon.' : 'No recent order is available in this browser.'}>
      {!lastOrder ? (
        <div className="rounded-lg border border-[#2c2117]/10 bg-white p-6">
          <Link to="/#menu" className="inline-flex items-center gap-2 font-medium text-[#4d6d47] hover:underline"><ArrowLeft size={16} />Back to the menu</Link>
        </div>
      ) : (
        <article className="print-receipt mx-auto max-w-lg rounded-lg border border-[#2c2117]/10 bg-white p-4 sm:p-6">
          <div className="flex items-start justify-between gap-4 border-b border-[#2c2117]/10 pb-4">
            <div><p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#b5502e]">RUPP Cafe</p><h2 className="mt-1 font-serif text-2xl font-semibold">Order receipt</h2><p className="mt-1 text-xs text-[#5c5346]">Thanks for your order.</p></div>
            <button type="button" onClick={() => window.print()} className="print-hidden inline-flex shrink-0 items-center gap-2 rounded-md border border-[#2c2117]/15 px-3 py-2 text-sm font-medium transition hover:bg-[#f3f0e8]" aria-label="Print order receipt"><Printer size={16} />Print</button>
          </div>
          <div className="flex justify-between gap-4 py-3 text-xs">
            <div><p className="text-[#5c5346]">Order number</p><p className="mt-1 font-semibold">{lastOrder.id}</p></div>
            <div className="text-right"><p className="text-[#5c5346]">Placed</p><p className="mt-1 font-medium">{formatDate(lastOrder.createdAt)}</p></div>
          </div>
          <div className="grid gap-2 rounded-md bg-[#f3f0e8] p-3 text-xs sm:grid-cols-2">
            <div><p className="text-[#5c5346]">Pickup for</p><p className="mt-1 font-semibold">{lastOrder.details.name}</p></div>
            <div><p className="text-[#5c5346]">Pickup time</p><p className="mt-1 font-medium">{lastOrder.details.pickupTime}</p></div>
            <div className="sm:col-span-2"><p className="text-[#5c5346]">Email</p><p className="mt-1 break-all font-medium">{lastOrder.details.email}</p></div>
          </div>
          <h3 className="mt-4 text-sm font-semibold">Items</h3>
          <ul className="mt-1 divide-y divide-[#2c2117]/10 border-t border-[#2c2117]/10">
            {lastOrder.items.map((item) => <li key={item.id} className="flex justify-between gap-4 py-2 text-sm"><div className="min-w-0"><span>{item.quantity} × {item.name}</span><CustomizationSummary customization={item.customization} /></div><span className="shrink-0">{money(item.quantity * item.price)}</span></li>)}
          </ul>
          <div className="space-y-1 border-t border-[#2c2117]/10 pt-3 text-sm">
            <div className="flex justify-between text-[#5c5346]"><span>Subtotal</span><span>{money(lastOrder.subtotal)}</span></div>
            <div className="flex justify-between text-[#5c5346]"><span>Estimated tax</span><span>{money(lastOrder.tax)}</span></div>
            <div className="flex justify-between border-t border-[#2c2117]/10 pt-2 font-semibold"><span>Total</span><span>{money(lastOrder.total)}</span></div>
          </div>
          <div className="mt-3 border-t border-dashed border-[#2c2117]/20 pt-3 text-xs">
            <div className="flex justify-between gap-3"><span className="text-[#5c5346]">Payment</span><span className="font-medium">{lastOrder.paymentMethod === 'at-pickup' ? 'Pay at pickup' : 'Online demo'}</span></div>
            <p className="mt-1 text-right text-[#5c5346]">{lastOrder.paymentMethod === 'at-pickup' ? 'Due at the counter' : 'Demo only · not charged'}</p>
          </div>
          <Link to="/" className="print-hidden mt-4 flex w-full items-center justify-center gap-2 rounded-md border border-[#2c2117]/15 bg-white px-4 py-2.5 text-sm font-semibold text-[#2c2117] transition hover:bg-[#f3f0e8]">Back to RUPP Cafe<ArrowRight size={16} /></Link>
        </article>
      )}
    </FlowLayout>
  )
}
