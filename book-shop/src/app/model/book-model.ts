export class BookModel {
    name: string;
    author: string;
    price: string;
    imageurl: string;

    constructor(name: string, author: string, price: string, imageurl: string){
        this.name = name;
        this.author = author;
        this.price = price;
        this.imageurl = imageurl;
    }
}
