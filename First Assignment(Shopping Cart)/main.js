let quantity;
let addedToCart = new Array();

let items = document.getElementsByClassName('btn');
// document.getElementById('section-header').innerHTML = localStorage.getItem('value');
document.getElementById('clear').addEventListener('click', ()=>{
    localStorage.clear();
    location.reload();
});

for (let index = 0; index < items.length; index++) {
    let checkCart = localStorage.getItem(index);
    quantity = (localStorage.getItem('value')) ? (localStorage.getItem('value')) : 0;

    items[index].addEventListener('click', countQuantity);

    function countQuantity() {
        if (!checkCart && !addedToCart[index]) {
            quantity++;
            localStorage.setItem('value', quantity);
            if(localStorage.getItem('value')>0){
                document.getElementById('section-header').innerHTML = localStorage.getItem('value');
            }else{
                document.getElementById('section-header').innerHTML = 0;
            }
            
            localStorage.setItem(index, 1);
            addedToCart[index] = 1;
        }
        else{
            alert('You have already added this item to the Cart!');
            
        }
    }
}

if(localStorage.getItem('value')>0){
    document.getElementById('section-header').innerHTML = localStorage.getItem('value');
}else{
    document.getElementById('section-header').innerHTML = 0;
}
