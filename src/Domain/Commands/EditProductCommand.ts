import { Data } from "node-lombok";

export interface EditProductData{
    shopID:string;
    productID:string;
    name:string;
    inInventory:number;
    isEnabled:boolean;
    max:number;
    min:number;
    price:number;
}

@Data()
export class EditProductCommand {

    [x: string]: any;

    private editProductData: EditProductData;

    constructor(editProductData: EditProductData){
        this.editProductData = editProductData;
    }

    public getShopID():string{
        return this.editProductData.shopID;
    }

}