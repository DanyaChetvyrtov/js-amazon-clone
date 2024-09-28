import { cart } from '../../data/cart.js'
import { getProduct } from '../../data/products.js'
import { getDeliveryOption } from '../../data/deliveryOptions.js'
import { formatCurrency } from '../utils/money.js'


export function renderPaymentSummary(){
  document.querySelector('.payment-summary')

  let productsPrice = 0
  let shippingPrice = 0

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId)
    productsPrice += (product.priceCents * cartItem.quantity)

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId)
    shippingPrice += (deliveryOption.priceCents)
  })

  const totalBeforeTax = productsPrice + shippingPrice
  const tax = totalBeforeTax * 0.1

  const totalPrice = totalBeforeTax + tax

  const paymentSummaryHTML = `
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${formatCurrency(productsPrice)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPrice)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(tax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalPrice)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
  `

  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML
}