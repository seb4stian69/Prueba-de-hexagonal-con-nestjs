import Instant from "ts-time/Instant";
import { Data } from "node-lombok";
import { ShopID } from "../Shop";
import { CName } from "../Values/CName";

export interface ProductPurchasedData{
    date:Instant;
    idType:string;
    idClient:string;
    clientName: CName;
    products: Map<string,number>;
    shopID: ShopID;
}

@Data()
export class ProductPurchasedEvent{

    [x: string]: any;

    private productPurchasedData: ProductPurchasedData;

    constructor(productPurchasedData: ProductPurchasedData){
        this.productPurchasedData = productPurchasedData;
    }

}