export let cart = JSON.parse(localStorage.getItem('cart'))


function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart))
}

export function addToCart (productId){
  let matchingItem

  cart.forEach((cartItem) => {
    if(cartItem.productId === productId)
      matchingItem = cartItem
  })

  if(matchingItem)
    matchingItem.quantity++
  else 
    cart.push({
      productId: productId,
      quantity: 1
    })
  
  saveToStorage()
}

export function deleteFromCart (productId){
  let newCart = []

  cart.forEach((cartItem) => {
    if(cartItem.productId !== productId)
      newCart.push(cartItem)   
  })

  cart = newCart

  saveToStorage()
}