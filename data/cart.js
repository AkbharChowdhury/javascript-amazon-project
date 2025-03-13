export let cart = [];

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
        quantity: 1
    });



}