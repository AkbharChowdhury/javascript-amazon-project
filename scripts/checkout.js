import { cart, removeFromCart } from "../data/cart.js";
import { getProducts } from './products.js'
import { formatCurrency } from './money.js'
// import dayJs from "https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"
import { deliveryOptions } from '../data/deliveryOptions.js'
getProducts().then(products => checkout(products));

function generateCartSummaryHtml(matchingProducts) {
    let html = '';
    cart.forEach((cartItem, index) => {
        const matchingProduct = matchingProducts[index];
        const deliveryOptionId = cartItem.deliveryOptionId;
        const deliveryDays = deliveryOptions.filter(option =>  option.id === deliveryOptionId).map(option => option.deliveryDays);
        const deliveryDate = formatDeliveryDate(deliveryDays[0])

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
                   ${deliveryOptionsHtml(matchingProduct, cartItem)}
                  
                  
                </div>
            </div>
    </div>
    
        `;
    });
    return html;

}
function formatDeliveryDate(numDay){
    const today = dayjs();
    const deliveyrDate = today.add(numDay, 'days');
    return deliveyrDate.format('dddd, MMMM, D');
}
function deliveryOptionsHtml(matchingProduct, cartItem) {
    let html = '';

 
    deliveryOptions.forEach(deliveryOption => {
        // const deliveyrDate = today.add(deliveryOption.deliveryDays, 'days');
        // const dateStr = deliveyrDate.format('dddd, MMMM, D');
        const dateStr = formatDeliveryDate(deliveryOption.deliveryDays)
        const priceStr = deliveryOption.price === 0 ? 'FREE' : `${formatCurrency(deliveryOption.price)} - `;
        const isChecked = deliveryOption.id === cartItem.deliveryOptionId
        html+=`
     <div class="delivery-option">
    <input type="radio" ${isChecked ? 'checked': ''} 
    class="delivery-option-input"
     name="delivery-option-${matchingProduct.id}" />
    <div>
        <div class="delivery-option-date">
            ${dateStr}
        </div>
        <div class="delivery-option-price">
            ${priceStr} Shipping
        </div>
    </div>
</div>
        
        `
    });

    return html;


}
function checkout(products) {
    const cartProductIds = cart.map(cartItem => cartItem.productId);
    const matchingProducts = products.filter(product => cartProductIds.includes(product.id)).map(product => product);
    document.querySelector('.js-order-summary').innerHTML = generateCartSummaryHtml(matchingProducts);
    document.querySelectorAll('.js-delete-link').forEach(link => link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        removeFromCart(productId);
        const container = document.querySelector(`.js-cart-item-container-${productId}`)
        container.remove();

    }));

}   
