import Instant from "ts-time/Instant";
import { Data } from "node-lombok";
import { ShopID } from "../Shop";
import { CName } from "../Values/CName";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({collection:'Invoices'})
export class Invoices{
    @Prop()
    date:string;
    @Prop()
    idType:string;
    @Prop()
    idClient:string;
    @Prop()
    clientName:string;
    @Prop()
    products:Map<string,number>;
    @Prop()
    shopID:string;

    constructor(date:string,idType:string,idClient:string,clientName:string,products:Map<string,number>,shopID:string) {
        this.date = date;
        this.idType = idType;
        this.idClient = idClient;
        this.clientName = clientName;
        this.products = products;
        this.shopID = shopID;
    }

}

export type InvoiceDocument = HydratedDocument<Invoices>;
export const InvoiceSchema = SchemaFactory.createForClass(Invoices)

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

    public getProductPurchasedData(): ProductPurchasedData{
        return this.productPurchasedData;
    }

    public parseToInvoiceSchame():Invoices{

        return new Invoices(
            this.productPurchasedData.date.toString(),
            this.productPurchasedData.idType,
            this.productPurchasedData.idClient,
            this.productPurchasedData.clientName.split(' ')[0] +' '+ this.productPurchasedData.clientName.split(' ')[1],
            this.productPurchasedData.products,
            this.productPurchasedData.shopID.id

        );
    }

}