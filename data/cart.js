// export var cart = [{
//     productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
//     quantity: 4

// }, {
//     productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
//     quantity: 1

// }
// ];

function getDefaultProduct(){
    return [{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 4
    
    }, {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1
    
    }
    ]
}
export let cart =  JSON.parse(localStorage.getItem('cart'))
if(!cart) cart = getDefaultProduct()

function saveToStorage() {
    localStorage.setItem('cart',JSON.stringify(cart))
    
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
        quantity: 1
    });
    saveToStorage();



}

export function removeFromCart(productId) {
    const newCart = cart.filter(cartItem => cartItem.productId !== productId).map(cartItem => cartItem);
    cart = newCart;
    saveToStorage();

}