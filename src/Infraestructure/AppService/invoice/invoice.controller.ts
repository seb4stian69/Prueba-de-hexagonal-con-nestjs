import { Controller, Post, Body, Put, Delete, Get } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { BuyProductCommand, BuyProductData } from 'src/Domain/Commands/BuyProductCommand';
import { GetAllBuysQuery } from './QueryHandler/Query/GetAllBuysQuery';
import { GetAllBuysByUserIDQuery } from './QueryHandler/Query/GetAllBuysByUserIDQuery';


@Controller()
export class InvoiceController {

  constructor(
    private readonly commandBus: CommandBus,
    private readonly querybus: QueryBus
  ) {}

  /* +---------------------------| Only for buys |---------------------------+ */
  
  @Get('/shop/buy')
  getBuys(@Body() data:{shopid:string}): Promise<BuyProductCommand> {
    return this.querybus.execute(new GetAllBuysQuery(data.shopid))
  }
  
  @Get('/shop/buybyuserid')
  getBuysByUser(@Body() data:{userID:string,shopID:string}): Promise<BuyProductCommand> {
    return this.querybus.execute(new GetAllBuysByUserIDQuery(data.userID, data.shopID))
  }
  
  @Post('/shop/buy')
  buyProducts(@Body() data:BuyProductData): Promise<BuyProductCommand> {
    return this.commandBus.execute(new BuyProductCommand(data))
  }

}
