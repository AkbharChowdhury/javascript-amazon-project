import { getProducts, getProduct } from './../products.js'
import { cart } from "../../data/cart.js";
import { formatCurrency } from '../utils/money.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';

export const loadPaymentSummary = () => getProducts().then(products => renderPaymentSummary(products));

function renderPaymentSummary(products) {
    const productPrices = getProduct(cart, products).map(product => product.price);
    const cartSummary = getCartSummary(productPrices)
    const total = cartSummary.reduce((acc, item) => acc + (item.quantity * item.price), 0);

    
    const shippingPrices = cart.map(cartItem => getDeliveryOption(cartItem.deliveryOptionId).price);
    const totalShippingCost = shippingPrices.reduce((acc, item) => acc + item, 0);



}
function getCartSummary(productPrices) {
    return cart.map((cartItem, i) => {
        return {
            price: productPrices[i],
            quantity: cartItem.quantity
        }
    })

}