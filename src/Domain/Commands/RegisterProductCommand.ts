import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Data } from "node-lombok";


@Schema({collection:'Products'})
export class Products{

    @Prop()
    shopID:string;
    @Prop()
    productID:string;
    @Prop()
    name:string;
    @Prop()
    inInventory:number;
    @Prop()
    isEnabled:boolean;
    @Prop()
    max:number;
    @Prop()
    min:number;
    @Prop()
    price:number;

    public getShopID():string {return this.shopID}

}

export type ProductDocument = HydratedDocument<Products>;
export const ProductsSchema = SchemaFactory.createForClass(Products)

@Data()
export class RegisterProductCommand {

    [x: string]: any;

    private product: Products;

    constructor(product: Products){
        this.product = product;
    }

    public getProduct(): Products{return this.product}

    public getShopID(): string{
        return this.product.shopID;
    }

}
