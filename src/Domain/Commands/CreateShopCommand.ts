import { Data } from "node-lombok";

@Data()
export class CreateShopCommand{

    [x: string]: any;

    private shopID: string;

    constructor(shopID: string){
        this.shopID = shopID;
    }

    public getShopID(): string{
        return this.shopID;
    }

}