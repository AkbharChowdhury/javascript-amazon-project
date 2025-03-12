async function getProducts() {
  try {
    const response = await axios.get('products.json');
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
// import {getProducts} from './products'
getProducts().then(products => {
  console.log('products', products)

})
