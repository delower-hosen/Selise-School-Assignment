
const key = 'myStore';

function addItemOnLocalStorage(title, price, imageSrc){
    if(title && price && imageSrc){
    var obj = {
        title: title,
        price: price,
        imageSrc: imageSrc,
        quantity: 1,
        purchased: false
    }
    myLocalStorage = [];
    if(localStorage.getItem(key)){
        myLocalStorage = JSON.parse(localStorage.getItem(key));
    }


    for(let item = 0; item < myLocalStorage.length; item++){
        if(myLocalStorage[item].title == title){
            alert('This item is already added to the cart')
            return true;
        }
    }

    myLocalStorage.push(obj);
    localStorage.setItem(key, JSON.stringify(myLocalStorage));
}
}

function getCurrentCart(key){
    return JSON.parse(localStorage.getItem(key));
}