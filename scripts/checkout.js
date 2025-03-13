import { cart } from "../data/cart.js";
// import {  } from "../data/products.json";
import { getProducts } from './products.js'
import { formatCurrency } from './money.js'

getProducts().then(products => checkout(products))

function checkout(products) {
    let matchingProduct;
    let cartSummaryHtml = '';
    // const prodMatch = products
    // .filter(product =>  product.id === '58b4fc92-e98c-42aa-8c55-b6b79996769a') 
    // .map(product => product);
    // console.log(prodMatch)
    cart.forEach((cartItem, index) => {
        console.log(index)
        products.forEach(product => {
            if (product.id === cartItem.productId) matchingProduct = product; 
            
        })

        cartSummaryHtml+=`
    
        <div class="cart-item-container">
        <div class="delivery-date">
            Delivery date: Tuesday, June 21
        </div>
    
        <div class="cart-item-details-grid">
            <img class="product-image" src="${matchingProduct.image}">
    
            <div class="cart-item-details">
                <div class="product-name">
                ${matchingProduct.name}
                </div>
                <div class="product-price">
                ${formatCurrency(matchingProduct.price)}
                </div>
                <div class="product-quantity">
                    <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                    Update
                </span>
                    <span class="delete-quantity-link link-primary">
                    Delete
                </span>
                </div>
            </div>
    
            <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>
                <div class="delivery-option">
                    <input type="radio" checked class="delivery-option-input" name="delivery-option-1">
                    <div>
                        <div class="delivery-option-date">
                            Tuesday, June 21
                        </div>
                        <div class="delivery-option-price">
                            FREE Shipping
                        </div>
                    </div>
                </div>
                <div class="delivery-option">
                    <input type="radio" class="delivery-option-input" name="delivery-option-1">
                    <div>
                        <div class="delivery-option-date">
                            Wednesday, June 15
                        </div>
                        <div class="delivery-option-price">
                            $4.99 - Shipping
                        </div>
                    </div>
                </div>
                <div class="delivery-option">
                    <input type="radio" class="delivery-option-input" name="delivery-option-1">
                    <div>
                        <div class="delivery-option-date">
                            Monday, June 13
                        </div>
                        <div class="delivery-option-price">
                            $9.99 - Shipping
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    `;
    
    });
    document.querySelector('.js-order-summary').innerHTML = cartSummaryHtml
    // console.warn(cartSummaryHtml)
}