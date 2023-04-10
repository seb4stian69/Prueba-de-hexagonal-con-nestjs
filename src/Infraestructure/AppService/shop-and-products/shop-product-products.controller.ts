import { Controller, Post, Body, Put, Delete, Get } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateShopCommand } from 'src/Domain/Commands/CreateShopCommand';
import { GetShopsQuery } from './QueryHandler/Query/Shop/GetShopsQuery';
import { GetShopsByIDQuery } from './QueryHandler/Query/Shop/GetShopsByIDQuery';
import { GetProductsCollectionQuery } from './QueryHandler/Query/Products/GetProductsCollectionQuery';
import { GetProductsByShopQuery } from './QueryHandler/Query/Products/GetProductsByShopQuery';
import { GetProductsByIdInShopQuery } from './QueryHandler/Query/Products/GetProductsByIdInShopQuery';
import { GetProductsByShopWithPaginationQuery } from './QueryHandler/Query/Products/GetProductsByShopWithPaginationQuery';
import { Products, RegisterProductCommand } from 'src/Domain/Commands/RegisterProductCommand';
import { EditProductCommand, EditProductData } from 'src/Domain/Commands/EditProductCommand';
import { DeleteProductCommand, DeleteProductData } from 'src/Domain/Commands/DeleteProductCommand';

@Controller()
export class ShopAndProductController {

  constructor(
    private readonly commandBus: CommandBus,
    private readonly querybus: QueryBus
  ) {}

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

}
