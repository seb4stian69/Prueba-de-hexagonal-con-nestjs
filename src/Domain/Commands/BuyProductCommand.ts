import Instant from "ts-time/Instant";
import { Data } from "node-lombok";

export class BuyProductData{
    shopID:string;
    date:Instant;
    idType:string;
    idClient:string;
    clientName:string;
    products: Map<string,number>;
}

@Data()
export class BuyProductCommand{

    [x: string]: any;

    buyProductData: BuyProductData;

    constructor(buyProductData: BuyProductData){
        this.buyProductData = buyProductData;
    }

}