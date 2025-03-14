import { getProducts, getProduct } from './../products.js'
import { cart, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
import { formatCurrency } from '../utils/money.js';

export const loadPaymentSummary = () => getProducts().then(products => renderPaymentSummary(products));

function renderPaymentSummary(products) {
        const product = getProduct(cart, products);
        const productPrices = getProduct(cart, products).map(product => product.price);
        console.log(productPrices)

    
      const total2 = cart.reduce((acc, item) => acc + (item.quantity * productPrices[0]), 0);
    let total = 0;
      cart.forEach((cartItem, i) => {
        total+= product[i]['price'] * cartItem.quantity
      });
      console.log(formatCurrency(total))
      console.log(formatCurrency(total2))

    
}