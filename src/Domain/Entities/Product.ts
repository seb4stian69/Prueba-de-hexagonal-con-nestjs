import { inInventory } from 'src/Domain/Values/InInventory';
import { Entity } from 'ddd-ts';
import { PName } from '../Values/PName';
import { Enable } from '../Values/Enable';
import { Max } from '../Values/Max';
import { Min } from '../Values/Min';
import { Price } from '../Values/Price';
import { Data } from "node-lombok";

interface DataProduct{
    id:string;
    tenantId:string;
    name:PName;
    inInventory:inInventory;
    isEnabled:Enable;
    max:Max;
    min:Min;
    price:Price;
}

export interface ProductID {
    id:string;
    tenantId:string;
}

@Data()
export class Product extends Entity<DataProduct>{

    constructor(name:PName, inInventory:inInventory, isEnabled:Enable, max:Max, min:Min, price:Price, superid:string) {
        
        const megaid:DataProduct = {
            id:superid.split('-')[1],
            tenantId:superid.split('-')[0],
            name:name,
            inInventory:inInventory,
            isEnabled:isEnabled,
            max:max,
            min:min,
            price:price
        }

        super(megaid);
        
    }

}