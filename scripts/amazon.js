let products_container = document.querySelector('.js-products-grid')

/*
{
id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
image: "images/products/athletic-cotton-socks-6-pairs.jpg",
name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
rating: {
  stars: 4.5,
  count: 87
},
priceCents: 1090,
keywords: [
  "socks",
  "sports",
  "apparel"
]
}
*/
products.forEach(
  (product) => {
    products_container.innerHTML +=  `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${(product.priceCents / 100).toFixed(2)}
      </div>

      <div class="product-quantity-container">
        <select>
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button js-add-to-cart-button button-primary" data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
    `
  }
)


document.querySelectorAll('.js-add-to-cart-button').forEach(
  (button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId

      let matchingItem

      cart.forEach((item) => {
        if(item.id === productId)
          matchingItem = item
      })

      if(matchingItem)
        matchingItem.quantity++
      else 
        cart.push({
          id: productId,
          quantity: 1
        })

      let totalQuantity = 0
      cart.forEach((item) => totalQuantity += item.quantity)

      document.querySelector('.js-cart-quantity').innerHTML = totalQuantity
    })
  }
)



