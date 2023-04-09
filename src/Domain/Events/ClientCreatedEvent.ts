import { Data } from "node-lombok";
import { CName } from "../Values/CName";
import { Email } from "../Values/Email";
import { UserName } from "../Values/UserName";
import { Password } from "../Values/Password";

export interface ClientCreatedData{
    id:string;
    tenantId:string;
    cName: CName;
    email: Email;
    username: UserName;
    password: Password;
}

@Data()
export class ClientCreatedEvent{

    [x: string]: any;

    constructor(data:ClientCreatedData){
        this.id = data.id;
        this.tenantId = data.tenantId;
        this.cName = data.cName;
        this.email = data.email;
        this.username = data.username;
        this.password = data.password;
    }

}