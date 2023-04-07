import { Data } from "node-lombok";
import { ValueObject } from "ddd-ts";

interface MinProps{
  value: number;
}

@Data()
export class Min extends ValueObject<MinProps>{

  [x: string]: any;

  constructor(quantity: MinProps){
    super(quantity);
  }

  public static of=(quantity: number)=>{
    const qty: MinProps = {
      value: quantity
    };
    return new Min(qty);
  }

}