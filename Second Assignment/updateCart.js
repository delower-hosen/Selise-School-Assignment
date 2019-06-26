var removeCartItemButtons = document.getElementsByClassName('btn-danger');
for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener('click', removeCartItem);
}

function removeCartItem(event) {
    var removedElement = event.target.parentElement.parentElement;
    var removedElementTitle = removedElement.getElementsByClassName('cart-item-title')[0].innerText;
    mylocalStore = JSON.parse(localStorage.getItem('myStore'));
    for(let i= 0; i< mylocalStore.length;i++){
        if(removedElementTitle == mylocalStore[i].title){
            mylocalStore.splice(i, 1);
        }
        localStorage.setItem('myStore', JSON.stringify(mylocalStore));
    }
    removedElement.remove();
    updateCartTotal();
}

// event.target.parentElement.parentElement.getElementsByClassName('cart-item-title')[0].innerText
var quantityInputs = document.getElementsByClassName('cart-quantity-input')
for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener('change', quantityChanged);
}

function quantityChanged(event) {
    var title = event.target.parentElement.parentElement.getElementsByClassName('cart-item-title')[0].innerText;
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    // debugger;
    mylocalStore = JSON.parse(localStorage.getItem('myStore'));
    for(let i= 0; i< mylocalStore.length;i++){
        if(title == mylocalStore[i].title){
            mylocalStore[i].quantity = input.value;
        }
        localStorage.setItem('myStore', JSON.stringify(mylocalStore));
    }
    // addItemToCart();
    updateCartTotal()
}