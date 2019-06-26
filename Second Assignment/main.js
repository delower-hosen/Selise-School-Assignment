window.onload = function(){
    addItemToCart();
    updateCartTotal();
    var addedToCartButton = document.getElementsByClassName('shop-item-button');
    for(let index = 0; index < addedToCartButton.length; index++){
        addedToCartButton[index].addEventListener('click', addedToCartButtonClicked);
    }

    function addedToCartButtonClicked(event){
        var domTarget = event.target;
        var shopItem = domTarget.parentElement.parentElement;
        var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
        var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
        var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
        addItemToCart(title, price, imageSrc);
        updateCartTotal();
    }

    // document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked);
    // function purchaseClicked() {
    //     alert('Thank you for your purchase')
    //     var cartItems = document.getElementsByClassName('cart-items')[0]
    //     while (cartItems.hasChildNodes()) {
    //         cartItems.removeChild(cartItems.firstChild)
    //     }
    //     updateCartTotal()
    // }

}