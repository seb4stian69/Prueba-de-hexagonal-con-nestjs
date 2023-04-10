import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { CreateClientCommand } from 'src/Domain/Commands/CreateClientCommand';
import { CreateClientUseCase } from 'src/Application/UseCase/CreateClientUseCase';

const inCommand: string = '[En el comando]'

/* + ------------------------------ | Create Client | ------------------------------ + */

@CommandHandler(CreateClientCommand)
export class CreateClientHandler implements ICommandHandler<CreateClientCommand> {

  constructor(
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateClientCommand) {

    console.log('\n+----------------------------------------------------+');
    console.log(`\x1b[32m${inCommand}\x1b[0m` + ' Creando cliente ...');

    let usecase = new CreateClientUseCase();
    const shop = await usecase.apply(command);
    this.publisher.mergeObjectContext(shop);
    shop.commit();

  }

} 