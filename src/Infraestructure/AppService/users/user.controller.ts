import { Controller, Post, Body, Put, Delete, Get } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateClientCommand, CreateClientCommandData } from 'src/Domain/Commands/CreateClientCommand';
import { GetUserQuery } from './QueryHandler/Query/GetUserQuery';

@Controller('/user')
export class UserController {

  constructor(
    private readonly commandBus: CommandBus,
    private readonly querybus: QueryBus
  ) {}

  /* +---------------------------| Only for users |---------------------------+ */
  @Get()
  getUser(@Body() data:{id:string}): Promise<any> {
    return this.querybus.execute(new GetUserQuery(data.id));
  }

  @Post()
  createUser(@Body() data:CreateClientCommandData): Promise<any> {
    return this.commandBus.execute(new CreateClientCommand(data.id, data.tenantId, data.cName, data.email, data.username, data.password, data.shopID));
  }

}
