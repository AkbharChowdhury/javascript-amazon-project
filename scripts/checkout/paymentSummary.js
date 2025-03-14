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
    const totalBeforeTax = total + totalShippingCost;
    const vatAmount = 0.1;
    const vat = totalBeforeTax * vatAmount;
    const grandTotal = totalBeforeTax + vat;

    const html = paymentSummaryHtml(total,totalShippingCost, totalBeforeTax, vat, grandTotal);
    document.querySelector('.js-payment-summary').innerHTML = html;
 

}
function paymentSummaryHtml(total,totalShippingCost, totalBeforeTax,vat, grandTotal) {
    return`
     <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">
                ${formatCurrency(total)}
            </div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">
            
                ${formatCurrency(totalShippingCost)}


            </div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>

            <div class="payment-summary-money">
                 ${formatCurrency(totalBeforeTax)}
            
            </div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">  ${formatCurrency(vat)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">${formatCurrency(grandTotal)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
    
    
    `;
    
    
}
function getCartSummary(productPrices) {
    return cart.map((cartItem, i) => {
        return {
            price: productPrices[i],
            quantity: cartItem.quantity
        }
    })

}