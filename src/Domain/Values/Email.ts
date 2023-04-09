import { Data } from "node-lombok";
import { ValueObject } from "ddd-ts";

interface EmailProps{
  value: string;
}

@Data()
export class Email extends ValueObject<EmailProps>{

  [x: string]: any;

  constructor(email: EmailProps){
    super(email);
  }

  public static of=(email: string)=>{
    const emailsend: EmailProps = {
      value: email
    };
    return new Email(emailsend);
  }

}