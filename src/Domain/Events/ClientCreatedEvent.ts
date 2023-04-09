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
    shopID:string;
}

@Data()
export class ClientCreatedEvent{

    [x: string]: any;

    private id:string;
    private tenantId:string;
    private cName: CName;
    private email: Email;
    private username: UserName;
    private password: Password;
    private shopID: string;

    constructor(data:ClientCreatedData){
        this.id = data.id;
        this.tenantId = data.tenantId;
        this.cName = data.cName;
        this.email = data.email;
        this.username = data.username;
        this.password = data.password;
        this.shopID = data.shopID;
    }

    public getClientCreatedData():ClientCreatedData{
        return {
            id: this.id,
            tenantId: this.tenantId,
            cName: this.cName,
            email: this.email,
            username: this.username,
            password: this.password,
            shopID: this.shopID
        }
    }

}