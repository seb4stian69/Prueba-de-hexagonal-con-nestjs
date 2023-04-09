import { Controller, Post, Body, Put, Delete, Get } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { BuyProductCommand, BuyProductData } from 'src/Domain/Commands/BuyProductCommand';
import { CreateShopCommand } from 'src/Domain/Commands/CreateShopCommand';
import { DeleteProductCommand, DeleteProductData } from 'src/Domain/Commands/DeleteProductCommand';
import { EditProductCommand, EditProductData } from 'src/Domain/Commands/EditProductCommand';
import { RegisterProductCommand, Products } from 'src/Domain/Commands/RegisterProductCommand';
import { ShopD } from 'src/Domain/Shop';
import { GetProductsByShopQuery } from './QueryHandler/Querys/Products/GetProductsByShopQuery';
import { GetProductsByIdInShopQuery } from './QueryHandler/Querys/Products/GetProductsByIdInShopQuery';
import { GetProductsByShopWithPaginationQuery } from './QueryHandler/Querys/Products/GetProductsByShopWithPaginationQuery';
import { GetProductsCollectionQuery } from './QueryHandler/Querys/Products/GetProductsCollectionQuery';
import { GetShopsQuery } from './QueryHandler/Querys/Shops/GetShopsQuery';
import { GetShopsByIDQuery } from './QueryHandler/Querys/Shops/GetShopsByIDQuery';
import { GetAllBuysByUserIDQuery } from './QueryHandler/Querys/Buys/GetAllBuysByUserIDQuery';
import { GetAllBuysQuery } from './QueryHandler/Querys/Buys/GetAllBuysQuery';
import { GetUserQuery } from './QueryHandler/Querys/Users/GetUserQuery';
import { CreateClientCommand, CreateClientCommandData } from 'src/Domain/Commands/CreateClientCommand';

@Controller()
export class AppController {

  constructor(
    private readonly commandBus: CommandBus,
    private readonly querybus: QueryBus
  ) {}

  /* +---------------------------| Only for users |---------------------------+ */
  @Get('/user')
  getUser(@Body() data:{id:string}): Promise<any> {
    return this.querybus.execute(new GetUserQuery(data.id));
  }

  @Post('/user')
  createUser(@Body() data:CreateClientCommandData): Promise<any> {
    return this.commandBus.execute(new CreateClientCommand(data.id, data.tenantId, data.cName, data.email, data.username, data.password, data.shopID));
  }

  /* +---------------------------| Only for shops |---------------------------+ */
  
  @Post('/shop')
  createShop(@Body() id:string): Promise<CreateShopCommand> {
    return this.commandBus.execute(new CreateShopCommand(id));
  }
  
  @Get('/shop')
  getAllShops(): Promise<any> {
    return this.querybus.execute(new GetShopsQuery());
  }
  
  @Get('/shopbyid')
  getShopByID(@Body() data:{shopid:string}): Promise<any> {
    return this.querybus.execute(new GetShopsByIDQuery(data.shopid));
  }

  /* +---------------------------| Only for products |---------------------------+ */

  @Get('/product')
  getProductCollection(): Promise<any> {
    return this.querybus.execute(new GetProductsCollectionQuery());
  }
  
  @Get('/shop/product')
  getProductsByShop(@Body() shopid:{shopid:string}): Promise<any> {
    return this.querybus.execute(new GetProductsByShopQuery(shopid.shopid));
  }

  @Get('/shop/productbyid')
  getProductByShopAndProductID(@Body() data:{shopid:string,productid:string}): Promise<any> {
    return this.querybus.execute(new GetProductsByIdInShopQuery(data.shopid,data.productid));
  }

  @Get('/shop/productlimits')
  getProductsByShopWithPagination(@Body() data:{page:number,limit:number,shopid:string}): Promise<any> {
    return this.querybus.execute(new GetProductsByShopWithPaginationQuery(data.shopid, data.page, data.limit));
  }

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
