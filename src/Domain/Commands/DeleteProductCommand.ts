import { Data } from "node-lombok";

export interface DeleteProductData{
    shopID: string;
    productID:string;
}

@Data()
export class DeleteProductCommand{

    [x: string]: any;

    private shopID: string;
    private productID: string;

    constructor(shopID: string, productID: string){
        this.shopID = shopID;
        this.productID = productID;
    }

}