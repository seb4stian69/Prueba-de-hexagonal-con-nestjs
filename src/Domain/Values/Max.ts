import { Data } from "node-lombok";
import { ValueObject } from "ddd-ts";

interface MaxProps{
  value: number;
}

@Data()
export class Max extends ValueObject<MaxProps>{

  [x: string]: any;

  constructor(quantity: MaxProps){
    super(quantity);
  }

  public static of=(quantity: number)=>{
    const qty: MaxProps = {
      value: quantity
    };
    return new Max(qty);
  }

}