const cart = {
  cartItems: JSON.parse(localStorage.getItem('cartOOP')),
  saveToStorage() {
    localStorage.setItem('cartOOP', JSON.stringify(this.cartItems))
  },
  addToCart (productId){
    let matchingItem
  
    this.cartItems.forEach((cartItem) => {
      if(cartItem.productId === productId)
        matchingItem = cartItem
    })
  
    if(matchingItem)
      matchingItem.quantity++
    else 
      this.cartItems.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: '1'
      })
    
    this.saveToStorage()
  },
  deleteFromCart (productId){
    let newCart = []
  
    this.cartItems.forEach((cartItem) => {
      if(cartItem.productId !== productId)
        newCart.push(cartItem)   
    })
  
    this.cartItems = newCart
  
    this.saveToStorage()
  },
  updateDeliveryOption(productId, deliveryOptionId){
    let matchingItem
  
    this.cartItems.forEach((cartItem) => {
      if(cartItem.productId === productId)
        matchingItem = cartItem
    })
  
    matchingItem.deliveryOptionId = deliveryOptionId
  
    this.saveToStorage()
  }
}

console.log(cart)
