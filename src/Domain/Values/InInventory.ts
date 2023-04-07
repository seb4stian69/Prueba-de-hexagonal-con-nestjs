import { Data } from "node-lombok";
import { ValueObject } from "ddd-ts";

interface inInventoryProps{
  value: number;
}

@Data()
export class inInventory extends ValueObject<inInventoryProps>{

  [x: string]: any;

  constructor(quantity: inInventoryProps){
    super(quantity);
  }

  public static of=(quantity: number)=>{
    const qty: inInventoryProps = {
      value: quantity
    };
    return new inInventory(qty);
  }

}