import { Data } from "node-lombok";

@Data()
export class CreateClientCommand{

    [x: string]: any;

    private id:string;
    private tenantId:string;
    private cName: string;
    private email: string;
    private username: string;
    private password: string;

    constructor(id:string, tenantId:string, cName: string, email: string, username: string, password: string){
        this.id = id;
        this.tenantId = tenantId;
        this.cName = cName;
        this.email = email;
        this.username = username;
        this.password = password;
    }

}