import { Entity } from 'ddd-ts';
import { CName } from '../Values/CName';
import { UserName } from '../Values/UserName';
import { Data } from "node-lombok";
import { Email } from '../Values/Email';
import { Password } from '../Values/Password';

export interface ClientProps {
    id:string;
    tenantId:string;
    cName: CName;
    email: Email;
    username: UserName;
    password: Password;
}

@Data()
export class Client extends Entity<ClientProps>{

    [x: string]: any;

    constructor(superid:string, cName: CName,  email: Email, username: UserName, password: Password) {
        
        const client: ClientProps = {
            id: superid.split('-')[1],
            tenantId: superid.split('-')[0],
            cName: cName,
            email: email,
            username: username,
            password: password

        }

        super(client);

    }

}