import { Data } from "node-lombok";

export interface CreateClientCommandData {
    id:string;
    tenantId:string;
    cName: string;
    email: string;
    username: string;
    password: string;
    shopID: string;
}

@Data()
export class CreateClientCommand{

    [x: string]: any;

    private id:string;
    private tenantId:string;
    private cName: string;
    private email: string;
    private username: string;
    private password: string;
    private shopID: string;

    constructor(id:string, tenantId:string, cName: string, email: string, username: string, password: string, shopID: string) {
        this.id = id;
        this.tenantId = tenantId;
        this.cName = cName;
        this.email = email;
        this.username = username;
        this.password = password;
        this.shopID = shopID;
    }

    public get Id(){
        return this.id
    }
    public get TenantId(){
        return this.tenantId
    }
    public get CName(){
        return this.cName
    }
    public get Email(){
        return this.email
    }
    public get Username(){
        return this.username
    }
    public get Password(){
        return this.password
    }

    public get ShopID() {
        return this.shopID
    }
    
}