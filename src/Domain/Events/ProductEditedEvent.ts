import { Data } from "node-lombok";
import { PName } from "../Values/PName";
import { inInventory } from "../Values/inInventory";
import { Enable } from "../Values/Enable";
import { Max } from "../Values/Max";
import { Min } from "../Values/Min";
import { Price } from "../Values/Price";
import { ShopID } from "../Shop";
import { ProductID } from "../Entities/Product";

export interface ProductEditedData{
    productID: ProductID;
    name: PName;
    inInventory: inInventory;
    enabled: Enable;
    max: Max;
    min: Min;
    price: Price;
    shopID: ShopID;
}

@Data()
export class ProductEditedEvent {
    
    [x: string]: any;

    private productEditedData: ProductEditedData;

    constructor(productEditedData: ProductEditedData){
        this.productEditedData = productEditedData;
    }

}