import { Data } from "node-lombok";
import { ValueObject } from "ddd-ts";

interface PasswordProps{
  value: string;
}

@Data()
export class Password extends ValueObject<PasswordProps>{

  [x: string]: any;

  constructor(pass: PasswordProps){
    super(pass);
  }

  public static of=(pass: string)=>{
    const passsend: PasswordProps = {
      value: pass
    };
    return new Password(passsend);
  }

}