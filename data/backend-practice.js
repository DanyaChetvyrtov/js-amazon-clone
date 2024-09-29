// let request = new XMLHttpRequest()

// let response

// request.addEventListener('load', () => {
//   // response = JSON.parse(request.response)
//   // console.log(response)
//   console.log(request.response)
 
// })

// request.open('GET', 'https://supersimplebackend.dev')
// request.send()


export let products = []

export function loadProducts(renderFunction){
  const request = new XMLHttpRequest()

  request.addEventListener('load', () => {
    products = JSON.parse(request.response)
    
    console.log('Loading products...')
    renderFunction()
  })

  request.open('GET', 'https://supersimplebackend.dev/products')
  request.send()
}
