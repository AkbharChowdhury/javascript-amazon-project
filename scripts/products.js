import {formatCurrency} from './utils/money.js'
class Product {
  id;
  image;
  name;
  rating;
  price;
  
  constructor(product){
    this.id = product.id;
    this.image = product.image;
    this.name = product.name;
    this.rating = product.rating;
    this.price = product.price;

  }

  getStarsUrl(){
    return`images/ratings/rating-${this.rating.stars * 10}.png`

  }
  getPrice(){
    return formatCurrency(this.price)

  }

}

export async function getProducts() {
  try {
    const response = await fetch('data/products.json');
    const products =  await response.json();
    const allProducts = products.map(product => {
      return new Product(product)
     
    });
    return allProducts;
  } catch (error) {
    console.error(error);
  }
}

export function getProduct(cart, products){
  const cartProductIds = cart.map(cartItem => cartItem.productId);
  const matchingProducts = products.filter(product => cartProductIds.includes(product.id)).map(product => product);
  return matchingProducts;
}