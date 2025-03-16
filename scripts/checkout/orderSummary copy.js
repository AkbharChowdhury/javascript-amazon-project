// import { cart, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
// import { getProducts, getProduct } from './../products.js'
// import { formatCurrency } from '../utils/money.js'
// import { formatDeliveryDate } from '../utils/date.js'
// import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js'
// import {loadPaymentSummary} from './paymentSummary.js'
// export const loadOrderSummary = () => getProducts().then(products => renderOrderSummary(products));

// function renderCartSummary(matchingProducts) {
//     let html = '';
//     cart.forEach((cartItem, index) => {
//         const matchingProduct = matchingProducts[index];
//         const deliveryOptionId = cartItem.deliveryOptionId;
//         const deliveryDay = deliveryOptions.filter(option =>  option.id === deliveryOptionId).map(option => option.deliveryDays)[0];
//         const deliveryDate = formatDeliveryDate(deliveryDay)

//         html += `
//         <div class="cart-item-container 
//         js-cart-item-container-${matchingProduct.id}">
//             <div class="delivery-date">
//                 Delivery date: ${deliveryDate}
//             </div>
//             <div class="cart-item-details-grid">
//                 <img class="product-image" src="${matchingProduct.image}" />
//                 <div class="cart-item-details">
//                     <div class="product-name">
//                         ${matchingProduct.name}
//                     </div>
//                     <div class="product-price">
//                         ${formatCurrency(matchingProduct.price)}
//                     </div>
//                     <div class="product-quantity">
//                         <span>
//                             Quantity:
//                             <span class="quantity-label">${cartItem.quantity}</span>
//                         </span>
//                         <span class="update-quantity-link link-primary">
//                             Update
//                         </span>
//                         <span class="delete-quantity-link link-primary js-delete-link"
//                         data-product-id="${matchingProduct.id}"
//                         >
//                             Delete
//                         </span>
//                     </div>
//                 </div>
//                 <div class="delivery-options">
//                     <div class="delivery-options-title">
//                         Choose a delivery option:
//                     </div>
//                    ${renderDeliveryOptions(matchingProduct, cartItem)}
                  
//                 </div>
//             </div>
//     </div>
    
//         `;
//     });
//     return html;

// }

// function renderDeliveryOptions(matchingProduct, cartItem) {
//     let html = '';
//     deliveryOptions.forEach(deliveryOption => {

//         const date = formatDeliveryDate(deliveryOption.deliveryDays)
//         const price = deliveryOption.price === 0 ? 'FREE' : `${formatCurrency(deliveryOption.price)} - `;
//         const isChecked = deliveryOption.id === cartItem.deliveryOptionId
//         html+=`
//      <div class="delivery-option js-delivery-option"
//      data-product-id="${matchingProduct.id}" 
//      data-delivery-option-id="${deliveryOption.id}"
     
//      >
//     <input type="radio" ${isChecked ? 'checked': ''} 
//     class="delivery-option-input"
//      name="delivery-option-${matchingProduct.id}" />
//     <div>
//         <div class="delivery-option-date">
//             ${date}
//         </div>
//         <div class="delivery-option-price">
//             ${price} Shipping
//         </div>
//     </div>
// </div>
//         `
//     });

//     return html;


// }
// function renderOrderSummary(products) {
//     const matchingProducts = getProduct(cart, products)
//     document.querySelector('.js-order-summary').innerHTML = renderCartSummary(matchingProducts);
//     document.querySelectorAll('.js-delete-link').forEach(link => link.addEventListener('click', () => {
//         const productId = link.dataset.productId;
//         removeFromCart(productId);
//         const container = document.querySelector(`.js-cart-item-container-${productId}`)
//         container.remove();

//     }));

//     document.querySelectorAll('.js-delivery-option').forEach(element => element.addEventListener('click', () =>{
//         const {productId, deliveryOptionId} = element.dataset;
//         updateDeliveryOption(productId, parseInt(deliveryOptionId));
//         loadOrderSummary();
//         loadPaymentSummary();
//     }));
// }   



import {updateDeliveryOption } from "../../data/cart.js";
import { getProducts, getProduct } from './../products.js'
import { formatCurrency } from '../utils/money.js'
import { formatDeliveryDate } from '../utils/date.js'
import { deliveryOptions } from '../../data/deliveryOptions.js'
import { Cart } from "../../data/cart-class.js";

import {loadPaymentSummary} from './paymentSummary.js'
export const loadOrderSummary = () => getProducts().then(products => renderOrderSummary(products));

const cart = new Cart('cart')

function renderCartSummary(matchingProducts) {
    let html = '';
    cart.cart.forEach((cartItem, index) => {
        const matchingProduct = matchingProducts[index];
        const deliveryOptionId = cartItem.deliveryOptionId;
        const deliveryDay = deliveryOptions.filter(option =>  option.id === deliveryOptionId).map(option => option.deliveryDays)[0];
        const deliveryDate = formatDeliveryDate(deliveryDay)

        html += `
        <div class="cart-item-container 
        js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
                Delivery date: ${deliveryDate}
            </div>
            <div class="cart-item-details-grid">
                <img class="product-image" src="${matchingProduct.image}" />
                <div class="cart-item-details">
                    <div class="product-name">
                        ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                        ${formatCurrency(matchingProduct.price)}
                    </div>
                    <div class="product-quantity">
                        <span>
                            Quantity:
                            <span class="quantity-label">${cartItem.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary">
                            Update
                        </span>
                        <span class="delete-quantity-link link-primary js-delete-link"
                        data-product-id="${matchingProduct.id}"
                        >
                            Delete
                        </span>
                    </div>
                </div>
                <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                   ${renderDeliveryOptions(matchingProduct, cartItem)}
                  
                </div>
            </div>
    </div>
    
        `;
    });
    return html;

}

function renderDeliveryOptions(matchingProduct, cartItem) {
    let html = '';
    deliveryOptions.forEach(deliveryOption => {

        const date = formatDeliveryDate(deliveryOption.deliveryDays)
        const price = deliveryOption.price === 0 ? 'FREE' : `${formatCurrency(deliveryOption.price)} - `;
        const isChecked = deliveryOption.id === cartItem.deliveryOptionId
        html+=`
     <div class="delivery-option js-delivery-option"
     data-product-id="${matchingProduct.id}" 
     data-delivery-option-id="${deliveryOption.id}"
     
     >
    <input type="radio" ${isChecked ? 'checked': ''} 
    class="delivery-option-input"
     name="delivery-option-${matchingProduct.id}" />
    <div>
        <div class="delivery-option-date">
            ${date}
        </div>
        <div class="delivery-option-price">
            ${price} Shipping
        </div>
    </div>
</div>
        `
    });

    return html;


}
function renderOrderSummary(products) {
    const matchingProducts = getProduct(cart.cart, products)
    document.querySelector('.js-order-summary').innerHTML = renderCartSummary(matchingProducts);
    document.querySelectorAll('.js-delete-link').forEach(link => link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        cart.removeFromCart(productId);
        const container = document.querySelector(`.js-cart-item-container-${productId}`)
        container.remove();

    }));

    document.querySelectorAll('.js-delivery-option').forEach(element => element.addEventListener('click', () =>{
        const {productId, deliveryOptionId} = element.dataset;
        cart.updateDeliveryOption(productId, parseInt(deliveryOptionId));
        loadOrderSummary();
        loadPaymentSummary();
    }));
}   
