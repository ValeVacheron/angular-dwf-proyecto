export class Product {
    product_id: number = 0;
    gtin: string = "";
    product: string = "";
    description: string = "";
    price: number = 0;
    stock: number = 0;
    category_id: number = 0;
    status: number = 0;
    constructor(product_id: number, gtin: string, product: string, description: string, price: number, stock: number, category_id: number, status:number) {
        this.product_id = product_id;
        this.gtin = gtin;
        this.product = product;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.category_id = category_id;
        this.status = status;
    }
}