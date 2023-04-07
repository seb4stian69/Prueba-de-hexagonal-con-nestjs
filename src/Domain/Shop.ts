import { AggregateRoot } from "@nestjs/cqrs";
import { Product, ProductID } from "./Entities/Product";
import { ShopCreatedEvent } from "./Events/ShopCreatedEvent";
import { ProductRegisteredData, ProductRegisteredEvent } from "./Events/ProductRegisteredEvent";
import { ProductEditedData, ProductEditedEvent } from './Events/ProductEditedEvent';
import { ProductDeletedEvent } from "./Events/ProductDeletedEvent";
import { ProductPurchasedData, ProductPurchasedEvent } from "./Events/ProductsPurchasedEvent";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export interface ShopID{
    id: string;
}

@Schema({collection:'Shop'})
export class ShopD{
    @Prop({unique:true})
    readonly shopID:string;
    @Prop()
    readonly products:Product[]
}

export type ShopDocument = HydratedDocument<ShopD>;
export const ShopSchema = SchemaFactory.createForClass(ShopD) 

export class Shop extends AggregateRoot{

    // + ------------------------      Atributes      ------------------------ + //

    private products: Product[] = new Array();

    // + ------------------------  Invoice Atributes  ------------------------ + //
    
    private clientID:string;
    private clientName:string;
    private productsPurchased:Map<string, number>;
    private total:number;
    public readonly id:ShopID

    // + ------------------------     Constructor     ------------------------ + //

    constructor(){
        super();
    }

    public static from(id:ShopID):Shop{
        const shop = new Shop();
        if(id!=null) shop.apply(new ShopCreatedEvent(id))
        return shop;
    }
    public static async fromTwo(id: ShopID, products: Product[]): Promise<Shop> {
        const shop = new Shop();
        await shop.setProducts(products);
        if (id != null) shop.apply(ShopCreatedEvent.from(id, shop.getProducts()));
        return shop;
    }

    // + ------------------------ Commands and Events ------------------------ + //

    public registerProduct(data:ProductRegisteredData):void {
        this.apply(new ProductRegisteredEvent(data));
    }

    public editProduct(data: ProductEditedData):void{
        this.apply(new ProductEditedEvent(data));
    }

    public deleteProduct(shopID:ShopID,productID: ProductID):void{
        this.apply(new ProductDeletedEvent(shopID, productID));
    }

    public buyProduct(buyProductData: ProductPurchasedData):void{
        this.apply(new ProductPurchasedEvent(buyProductData));
    }

    // + ------------------------ Getters & Setters ------------------------ + //

    public getProducts():Product[]{
        return this.products;
    }
    public setProducts(products:Product[]):void{
        this.products = products;
    }

}