import { ValueObject } from "ddd-ts";
import { Data } from "node-lombok";

interface PNameProps{
  value: string;
}

@Data()
export class PName extends ValueObject<PNameProps>{

  [x: string]: any;

  constructor(name: PNameProps){
    super(name);
  }

  public static of=(name: string)=>{
    const pname: PNameProps = {
      value: name
    };
    return new PName(pname);
  }

}