import { formatCurrency } from './utils/money.js'
import { getProducts } from './products.js'
import { Cart } from '../data/cart-class.js'
const cart = new Cart('cart')
function generateProductQtyOptions() {
  let prodQtyHtml = '';
  const maxQuantity = 10;
  for (let i = 1; i <= maxQuantity; i++) {
    if (i === 1) {
      prodQtyHtml += `<option selected value="${i}">${i}</option>`;
      continue;
    }

    prodQtyHtml += `<option value="${i}">${i}</option>`;


  }
  return prodQtyHtml;
}

function generateProductHtml(products) {
  let productHtml = '';
  products.forEach(product => {
    productHtml += `
      <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
            ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select>
              ${generateProductQtyOptions()}
            </select>
          </div>
          ${product.getExtraHtmlInfo()}

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>`;

  });

  return productHtml;

}


function updateCartQuantity() {
  document.querySelector('.js-cart-quantity').textContent = cart.getCartQuantity();

}

getProducts().then(products => {
  console.warn(products)
  updateCartQuantity();
  document.querySelector('.js-products-grid').innerHTML = generateProductHtml(products);

  document.querySelectorAll('.js-add-to-cart')
    .forEach(button => button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      cart.addToCart(productId);
      updateCartQuantity();

    })
    )

})


