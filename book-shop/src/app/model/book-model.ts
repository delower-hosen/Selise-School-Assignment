export class BookModel {
    bookid: string;
    name: string;
    author: string;
    price: string;
    imageurl: string;
    date: Date;
    _id: string;

    constructor(bookid: string, name: string, author: string, price: string, imageurl: string, date: Date, _id: string){
        this.bookid = bookid;
        this.name = name;
        this.author = author;
        this.price = price;
        this.imageurl = imageurl;
        this.date = date;
        this._id = _id;
    }
}
