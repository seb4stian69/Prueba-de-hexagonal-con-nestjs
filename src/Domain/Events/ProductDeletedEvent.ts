import { Data } from "node-lombok";
import { ProductID } from "../Entities/Product";
import { ShopID } from "../Shop";

@Data()
export class ProductDeletedEvent{

    [x: string]: any;

    private shopID: ShopID;
    private productID: ProductID;

    constructor(shopID: ShopID, productID: ProductID){
        this.shopID = shopID;
        this.productID = productID;
    }

}