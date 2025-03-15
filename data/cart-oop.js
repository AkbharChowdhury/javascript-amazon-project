const myCart = {

    cart: undefined,
    localStorageKey: 'cart-oop',

    loadFromStorage(){
        return JSON.parse(localStorage.getItem(this.localStorageKey)) ?? this.getDefaultProduct()

    },
    saveToStorage() {
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cart))
    },
     removeFromCart(productId) {
        const newCart = this.cart.filter(cartItem => cartItem.productId !== productId);
        this.cart = newCart;
        saveToStorage();
    },

    updateDeliveryOption(productId, deliveryOptionId) {
        const matchingItem = this.cart.filter(cartItem => cartItem.productId === productId);
        const otherItems = this.cart.filter(cartItem => cartItem.productId !== productId);
        matchingItem[0].deliveryOptionId = deliveryOptionId;
        this.cart = [
            ...matchingItem,
            ...otherItems
        ];

        this.saveToStorage();
    },

    addToCart(productId) {
        let matchingItem;
        this.cart.forEach((cartItem) => {
            if (productId === cartItem.productId) matchingItem = cartItem;
        });
    
    
        if (matchingItem) {
            matchingItem.quantity += 1;
            return;
        }
    
        this.cart.push({
            productId,
            quantity: 1,
            deliveryOptionId: 1
        });
    
        this.saveToStorage();
    
    },

     getDefaultProduct() {
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
}

