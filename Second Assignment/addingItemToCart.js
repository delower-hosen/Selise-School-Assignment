function addItemToCart(title, price, imageSrc) {
    // debugger;
    isAlreadyAdded = addItemOnLocalStorage(title, price, imageSrc);
    if(isAlreadyAdded) return;

    myCurrentStore = getCurrentCart(key);
    let start;
    let storeLength = myCurrentStore? myCurrentStore.length : 0;

    if(!title && !price && !imageSrc){
        start = 0;
    }
    else if(title && price && imageSrc){
        start = storeLength-1;
    }
    // debugger;

    for(let i = start; i < storeLength; i++){
            price = myCurrentStore[i].price;
            title = myCurrentStore[i].title;
            imageSrc = myCurrentStore[i].imageSrc;
            quantity = myCurrentStore[i].quantity;
            // localStorage.setItem(key, JSON.stringify(myCurrentStore));

    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')          // <div class="cart-row"></div>
    var cartItems = document.getElementsByClassName('cart-items')[0];

    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="${quantity}">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`

    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
    }
}