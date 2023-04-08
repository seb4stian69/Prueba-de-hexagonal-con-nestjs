import { Data } from "node-lombok";
import { PName } from "../Values/PName";
import { inInventory } from "../Values/inInventory";
import { Enable } from "../Values/Enable";
import { Max } from "../Values/Max";
import { Min } from "../Values/Min";
import { Price } from "../Values/Price";
import { ShopID } from "../Shop";
import { Product, ProductID } from "../Entities/Product";

export interface ProductRegisteredData{
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
export class ProductRegisteredEvent {

    [x: string]: any;

    private productRegisteredData: ProductRegisteredData;

    constructor(productRegisteredData: ProductRegisteredData){
        this.productRegisteredData = productRegisteredData;
    }

    public getProductRegisteredData(): ProductRegisteredData{
        return this.productRegisteredData;
    }

}