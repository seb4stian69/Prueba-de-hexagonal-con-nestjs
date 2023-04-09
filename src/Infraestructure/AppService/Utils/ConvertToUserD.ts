import { ClientCreatedEvent } from "src/Domain/Events/ClientCreatedEvent";
import { UserD } from "../Repository/UserRepository";

export const convertToUserD = (event: ClientCreatedEvent):UserD => {
    
    console.log( )

    return {
        userid: event.getClientCreatedData().tenantId +'-'+ event.getClientCreatedData().id,
        firstName: event.getClientCreatedData().cName.value.name,
        lastName: event.getClientCreatedData().cName.value.lastName,
        email: event.getClientCreatedData().email.value.value,
        username: event.getClientCreatedData().username.value.value,
        password: event.getClientCreatedData().password.value.value,
        shopID: event.getClientCreatedData().shopID
    }
}