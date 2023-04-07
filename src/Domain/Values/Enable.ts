import { ValueObject } from "ddd-ts";
import { Data } from "node-lombok";

interface EnableProps{
  value: boolean;
}

@Data()
export class Enable extends ValueObject<EnableProps>{

  [x: string]: any;

  constructor(isEnable: EnableProps){
    super(isEnable);
  }

  public static of=(isEnable: boolean)=>{
    const enable: EnableProps = {
      value: isEnable
    };
    return new Enable(enable);
  }

}