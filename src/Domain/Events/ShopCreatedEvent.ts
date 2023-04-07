import { Data } from "node-lombok";
import { ShopID } from "../Shop";
import { Product } from "../Entities/Product";

@Data()
export class ShopCreatedEvent{
    
    [x: string]: any;

    private shopID: ShopID;
    private products: Product[];

    constructor(shopID: ShopID){
        this.shopID = shopID;
    }

    public static from(shopID: ShopID, products: Product[]):ShopCreatedEvent{
        const event = new ShopCreatedEvent(shopID);
        event.setProducts(products)
        return event;
    }

    public setProducts(products: Product[]):void{
        this.products = products;
    }

    public getProducts():Product[]{
        return this.products;
    }

    public getShopID():any{
        return this.shopID.id;
    }

}