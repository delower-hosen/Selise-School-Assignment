function updateCartTotal(){
    let total = 0;
    // debugger;
    myLocalStore = JSON.parse(localStorage.getItem('myStore'));
    let len = myLocalStore? myLocalStore.length : 0;
    for(let item = 0; item < len; item++){
        let quantity = myLocalStore[item].quantity;
        let price = myLocalStore[item].price;
        let parsedPrice = parseFloat(price);
        total+=(parsedPrice*quantity);
    }
    total = Math.round(total * 100) / 100;
    localStorage.setItem('TotalAmount', total);

    document.getElementsByClassName('cart-total-price')[0].innerText = localStorage.getItem('TotalAmount');


}