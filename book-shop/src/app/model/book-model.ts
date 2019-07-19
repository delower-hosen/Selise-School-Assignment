export class BookModel {
    bookid: string;
    name: string;
    author: string;
    price: string;

    constructor(bookid: string, name: string, author: string, price: string){
        this.bookid = bookid;
        this.name = name;
        this.author = author;
        this.price = price;
    }
}
