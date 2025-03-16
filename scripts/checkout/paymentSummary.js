import { getProducts, getProduct } from './../products.js'
import { Cart } from "../../data/cart-class.js";
import { formatCurrency, percentageFormatter, getDecimalNumber } from '../utils/money.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';

const VAT_AMOUNT = 10;

let cart = getCart();

export const loadPaymentSummary = () => getProducts().then(products => renderPaymentSummary(products));

function getCart(){
  return new Cart('cart')

}
function renderPaymentSummary(products) {
  const paymentSummaryHtml = getPaymentSummaryHtml(getOrderPaymentData(products));
  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHtml;
}

function getOrderPaymentData(products) {
  let cart = getCart();

  const productPrices = getProduct(cart.cart, products).map(product => product.price);

  const cartSummary = getCartSummary(productPrices);

  const total = cartSummary.reduce((acc, item) => acc + (item.quantity * item.price), 0);

  const shippingPrices = cart.cart.map(cartItem => getDeliveryOption(cartItem.deliveryOptionId).price);

  const totalShippingCost = shippingPrices.reduce((acc, item) => acc + item, 0);
  const totalBeforeTax = total + totalShippingCost;
  const vat = totalBeforeTax * getDecimalNumber(VAT_AMOUNT);
  const grandTotal = totalBeforeTax + vat;



  return Object.freeze({
    total,
    totalShippingCost,
    totalBeforeTax,
    vat,
    grandTotal

  });


}
function getPaymentSummaryHtml(orderPaymentData) {
  document.querySelector('.js-checkout-num-items').innerText = `${cart.getCartQuantity()} items`

  return `
     <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cart.getCartQuantity()}):</div>
            <div class="payment-summary-money">
                ${formatCurrency(orderPaymentData.total)}
            </div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">
            
                ${formatCurrency(orderPaymentData.totalShippingCost)}

            </div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>

            <div class="payment-summary-money">
                 ${formatCurrency(orderPaymentData.totalBeforeTax)}
            </div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (${percentageFormatter(VAT_AMOUNT)}):</div>
            <div class="payment-summary-money">  ${formatCurrency(orderPaymentData.vat)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">${formatCurrency(orderPaymentData.grandTotal)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
    
    
    `;


}
function getCartSummary(productPrices) {

  return cart.cart.map((cartItem, i) => {
    return {
      price: productPrices[i],
      quantity: cartItem.quantity
    }
  })

}