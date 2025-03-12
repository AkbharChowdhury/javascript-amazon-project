//  const amazonProducts = [
//     {
//         image: "images/products/athletic-cotton-socks-6-pairs.jpg",
//         name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
//         rating: {
//             stars: 4.5,
//             count: 87
//         },
//         price: 10.90
//     },

//     {
//         image: "images/products/intermediate-composite-basketball.jpg",
//         name: "Intermediate Size Basketball",
//         rating: {
//             stars: 4,
//             count: 127
//         },
//         price: 20.95
//     },


//     {
//         image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
//         name: "Adults Plain Cotton T-Shirt - 2 Pack",
//         rating: {
//             stars: 4.5,
//             count: 56
//         },
//         price: 7.99
//     },
// ];

// function formatCurrency(amount){
//   return Intl.NumberFormat('en-GB', {
//     style: 'currency',
//     currency: 'GBP',
// })
// .format(amount);
  
// }
import { formatCurrency} from './money.js'
import { getProducts} from './products.js'

// async function getProducts() {
//   try {
//     const response = await axios.get('products.json');
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// }

getProducts().then(products => {
  let productHtml = '';

  products['products'].forEach(product => {
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
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
            ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${formatCurrency(product.price)}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary">
            Add to Cart
          </button>
        </div>`;

  });
  console.log(productHtml)
  // console.log(formatCurrency(12))



})

