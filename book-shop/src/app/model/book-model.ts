export class CorporateEmployee {
    bookname: string;
    authorname: string;
    price: number;
    imageurl: string

    constructor(bookname: string, authorname: string, price: number, imageurl: string){
        this.bookname = bookname;
        this.authorname = authorname;
        this.price = price;
        this.imageurl = imageurl;
    }
}