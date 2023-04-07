import { Data } from "node-lombok";
import { ValueObject } from "ddd-ts";

interface CNameProps{
  name: string;
  lastName: string;
}

@Data()
export class CName extends ValueObject<CNameProps>{

  [x: string]: any;

  constructor(CName: CNameProps){
    super(CName);
  }

  public static of=(name: string, lastName: string)=>{
    const cName: CNameProps = {
        name: name,
        lastName: lastName
    };
    return new CName(cName);
  }

}