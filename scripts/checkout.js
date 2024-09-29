import { renderOrederSummary } from './checkout/orderSummary.js'
import { renderPaymentSummary } from './checkout/paymentSummary.js'
import { loadProducts } from '../data/backend-practice.js'

loadProducts(() => {
  renderOrederSummary()
  renderPaymentSummary()
})
