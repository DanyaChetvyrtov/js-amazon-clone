import { cart, deleteFromCart, updateDeliveryOption } from "../../data/cart.js"
import { getProduct, products } from "../../data/products.js"
import { formatCurrency } from "../utils/money.js"
import  dayjs  from "https://unpkg.com/dayjs@1.11.10/esm/index.js"
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js"
import { renderPaymentSummary } from './paymentSummary.js'


export function renderOrederSummary(){ 
  let element_to_summary = ''

  cart.forEach((cartItem) => {
    
    const matchingProduct = getProduct(cartItem.productId)

    const deliveryOptionId = cartItem.deliveryOptionId

    let deliveryOption = getDeliveryOption(deliveryOptionId)

    let today = dayjs()

    element_to_summary += `
            <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
              <div class="delivery-date">
                Delivery date: ${today.add(deliveryOption.deliveryDays, 'days').format('dddd, MMMM D')}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingProduct.image}">

                <div class="cart-item-details">
                  <div class="product-name">
                    ${matchingProduct.name}
                  </div>
                  <div class="product-price">
                    $${formatCurrency(matchingProduct.priceCents)}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                      Update
                    </span>
                    <span class="delete-quantity-link js-delete-quantity-link link-primary" data-product-id="${matchingProduct.id}">
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryOptionHTML(cartItem, matchingProduct)}
                </div>
              </div>
            </div>
          `
        })
      document.querySelector('.js-order-summary').innerHTML = element_to_summary

  function deliveryOptionHTML(cartItem, matchingProduct){
    let allOptions = ''
    var today = dayjs()

    deliveryOptions.forEach((deliveryOption) => {
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId

      allOptions +=
      `
        <div class="delivery-option js-delivery-option"
          data-product-id="${matchingProduct.id}"
          data-delivery-option-id="${deliveryOption.id}"
        >
          <input type="radio" 
            ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${today.add(deliveryOption.deliveryDays, 'days').format('dddd, MMMM D')}
            </div>
            <div class="delivery-option-price">
              ${deliveryOption.priceCents === 0 ? 
                'FREE' : '$' + (deliveryOption.priceCents / 100) +' - '} Shipping
            </div>
          </div>
        </div>
      `
    })

    return allOptions
  }

  document.querySelectorAll('.js-delete-quantity-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId
      deleteFromCart(productId)
      document.querySelector(`.js-cart-item-container-${productId}`).remove()
      
      renderPaymentSummary()
    })
  })


  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const { productId, deliveryOptionId } = element.dataset
      updateDeliveryOption(productId, deliveryOptionId)
      renderOrederSummary()
      renderPaymentSummary()
    })
  })
}
