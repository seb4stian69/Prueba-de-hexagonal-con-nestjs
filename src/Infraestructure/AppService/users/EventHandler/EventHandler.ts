import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { ClientCreatedEvent } from 'src/Domain/Events/ClientCreatedEvent';
import { UserRepository } from '../../Common/Repository/UserRepository';
import { convertToUserD } from '../../Common/ConvertToUserD';

const inEvent: string = 'En el evento'

/* + ------------------------------ | Client Created | ------------------------------ + */

@EventsHandler(ClientCreatedEvent)
export class ClientCreatedHandler implements IEventHandler<ClientCreatedEvent> {

  constructor(
    private readonly userRepository:UserRepository,
  ){}

  handle(event: ClientCreatedEvent) {
    this.userRepository.saveUser(convertToUserD(event))
    console.log('\n' + `\x1b[32m[${inEvent}]\x1b[0m`+' Cliente guardado ...');
  }

} 