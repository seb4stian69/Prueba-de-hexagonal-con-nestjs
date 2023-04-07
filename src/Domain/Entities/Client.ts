import { Entity } from 'ddd-ts';
import { CName } from '../Values/CName';
import { UserName } from '../Values/UserName';
import { Data } from "node-lombok";

export interface ClientID {
    id:string;
    tenantId:string;
}

@Data()
export class Client extends Entity<ClientID>{

    [x: string]: any;

    private cName: CName;
    private username: UserName;

    constructor(cName: CName, username: UserName, superid:string) {
        
        const megaid: ClientID = {
            id: superid.split('-')[0],
            tenantId: superid.split('-')[1]
        }

        super(megaid);

        this.cName = cName;
        this.username = username;

    }

}