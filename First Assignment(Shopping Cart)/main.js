let quantity;
let addedToCart = new Array();

let items = document.getElementsByClassName('btn');

for (let index = 0; index < items.length; index++) {
    let checkCart = localStorage.getItem(index);
    quantity = (localStorage.getItem('value')) ? (localStorage.getItem('value')) : 0;

    items[index].addEventListener('click', countQuantity);

    function countQuantity() {
        if (!checkCart && !addedToCart[index]) {
            quantity++;
            localStorage.setItem('value', quantity);
            document.getElementById('section-header').innerHTML = localStorage.getItem('value');
            localStorage.setItem(index, 1);
            addedToCart[index] = 1;
        }
        else{
            alert('You have already added this item to the Cart!');
            
        }
    }
}
document.getElementById('section-header').innerHTML = localStorage.getItem('value');
