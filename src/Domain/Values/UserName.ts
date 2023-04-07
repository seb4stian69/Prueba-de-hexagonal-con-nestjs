import { ValueObject } from "ddd-ts";
import { Data } from "node-lombok";

interface UserNameProps{
  value: string;
}

@Data()
export class UserName extends ValueObject<UserNameProps>{

  [x: string]: any;

  constructor(name: UserNameProps){
    super(name);
  }

  public static of=(name: string)=>{
    const username: UserNameProps = {
      value: name
    };
    return new UserName(username);
  }

}