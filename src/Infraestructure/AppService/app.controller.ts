import { ShopRepository } from './Repository/ShopRepository';
import { ProductRepository } from './Repository/ProductRepository';
import { Controller, Post, Body, Put, Delete, Get } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { BuyProductCommand, BuyProductData } from 'src/Domain/Commands/BuyProductCommand';
import { CreateShopCommand } from 'src/Domain/Commands/CreateShopCommand';
import { DeleteProductCommand, DeleteProductData } from 'src/Domain/Commands/DeleteProductCommand';
import { EditProductCommand, EditProductData } from 'src/Domain/Commands/EditProductCommand';
import { RegisterProductCommand, Products } from 'src/Domain/Commands/RegisterProductCommand';
import { ShopD } from 'src/Domain/Shop';

@Controller()
export class AppController {

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly productRepository:ProductRepository,
    private readonly shopRepository:ShopRepository
  ) {}

  /* +---------------------------| Only for shops |---------------------------+ */
  @Post('/shop')
  createShop(@Body() id:string): Promise<CreateShopCommand> {
    return this.commandBus.execute(new CreateShopCommand(id));
  }

  @Get('/shop')
  getAllShops(): Promise<ShopD[]> {
    return this.shopRepository.getShops();
  }

  /* +---------------------------| Only for products |---------------------------+ */

  @Post('/shop/product')
  registerProduct(@Body() data:Products): Promise<RegisterProductCommand> {
    return this.commandBus.execute(new RegisterProductCommand(data));
  }

  @Put('/shop/product')
  editProduct(@Body() data:EditProductData): Promise<EditProductCommand> {
    return this.commandBus.execute(new EditProductCommand(data));
  }

  @Delete('/shop/product')
  deleteProduct(@Body() data:DeleteProductData): Promise<DeleteProductCommand> {
    return this.commandBus.execute(new DeleteProductCommand(data.shopID, data.productID));
  }

  /* +---------------------------| Only for buys |---------------------------+ */
  
  @Post('/shop/buy')
  buyProducts(@Body() data:BuyProductData): Promise<BuyProductCommand> {
    return this.commandBus.execute(new BuyProductCommand(data))
  }

  /* */

  @Get('/shop/product')
  async getProducts():Promise<Products[]>{
    return await this.productRepository.getProducts()
  }

}
