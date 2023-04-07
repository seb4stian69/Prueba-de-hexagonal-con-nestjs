import { Data } from "node-lombok";
import { ValueObject } from "ddd-ts";

interface PriceProps{
  value: number;
}

@Data()
export class Price extends ValueObject<PriceProps>{

  [x: string]: any;

  constructor(quantity: PriceProps){
    super(quantity);
  }

  public static of=(quantity: number)=>{
    const qty: PriceProps = {
      value: quantity
    };
    return new Price(qty);
  }

}