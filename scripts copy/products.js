export async function getProducts() {
  try {
    const response = await fetch('data/products.json');
    return response.json();
  } catch (error) {
    console.error(error);
  }
}
export function getProduct(cart, products){
  const cartProductIds = cart.map(cartItem => cartItem.productId);
  const matchingProducts = products.filter(product => cartProductIds.includes(product.id)).map(product => product);
  return matchingProducts;
}