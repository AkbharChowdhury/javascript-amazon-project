function getDefaultProduct() {
    return [{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: 1

    }, {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: 1


    }
    ]
}
export let cart = JSON.parse(localStorage.getItem('cart')) ?? getDefaultProduct();
function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart))

}
export function addToCart(productId) {
    let matchingItem;
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) matchingItem = cartItem;
    });


    if (matchingItem) {
        matchingItem.quantity += 1;
        return;
    }

    cart.push({
        productId,
        quantity: 1,
        deliveryOptionId: 1
    });

    saveToStorage();


}

export function removeFromCart(productId) {
    const newCart = cart.filter(cartItem => cartItem.productId !== productId);
    cart = newCart;
    saveToStorage();

}

export function updateDeliveryOption(productId, deliveryOptionId) {
    const matchingItem = cart.filter(cartItem => cartItem.productId === productId);
    const matchingItemObj = matchingItem[0];
    matchingItemObj['deliveryOptionId'] = deliveryOptionId;
    cart.forEach(cartItem => {
        if (cartItem.productId === matchingItemObj['productId']) {
            cartItem.deliveryOptionId = matchingItemObj['deliveryOptionId']
        }
    });

    saveToStorage();


}