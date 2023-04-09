import { DeleteProductCommand } from 'src/Domain/Commands/DeleteProductCommand';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateShopCommand } from 'src/Domain/Commands/CreateShopCommand';
import { ShopRepository } from '../Repository/ShopRepository';
import { CreateShopUseCase } from 'src/Application/UseCase/CreateShopUseCase';
import { BuyProductCommand } from 'src/Domain/Commands/BuyProductCommand';
import { BuyProductUseCase } from 'src/Application/UseCase/BuyProductUseCase';
import { RegisterProductCommand } from 'src/Domain/Commands/RegisterProductCommand';
import { RegisterProductUseCase } from 'src/Application/UseCase/RegisterProductUseCase';
import { EditProductCommand } from 'src/Domain/Commands/EditProductCommand';
import { EditProductUseCase } from 'src/Application/UseCase/EditProductUseCase';
import { DeleteProductUseCase } from 'src/Application/UseCase/DeleteProductUseCase';
import { ProductRepository } from '../Repository/ProductRepository';
import { Shop } from 'src/Domain/Shop';
import { CreateClientCommand } from 'src/Domain/Commands/CreateClientCommand';
import { CreateClientUseCase } from 'src/Application/UseCase/CreateClientUseCase';

const inCommand: string = '[En el comando]'

/* + ------------------------------ | Create shop | ------------------------------ + */
@CommandHandler(CreateShopCommand)
export class CreateShopHandler implements ICommandHandler<CreateShopCommand> {

  constructor(
    private readonly repository: ShopRepository,
    private readonly publisher: EventPublisher,
    private readonly productRepository:ProductRepository
  ) {}

  async execute(command: CreateShopCommand) {

    console.log('\n+----------------------------------------------------+');
    console.log(`\x1b[32m${inCommand}\x1b[0m` + ' Tienda en proceso de creacion ...');

    let usecase = new CreateShopUseCase(this.productRepository);
    const shop = await usecase.apply(command);

    console.log('Desde el comando sabemos que hay ' + shop.getProducts().length + ' productos');

    this.publisher.mergeObjectContext(shop);
    shop.commit();

  }

}

/* + ------------------------------ | Register Product | ------------------------------ + */
@CommandHandler(RegisterProductCommand)
export class RegisterProductHandler implements ICommandHandler<RegisterProductCommand> {

  constructor(
    private readonly repository: ShopRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: RegisterProductCommand) {

    console.log('\n+----------------------------------------------------+');
    console.log(`\x1b[32m${inCommand}\x1b[0m` + ' Producto en proceso de registro ...');

    let usecase:RegisterProductUseCase = new RegisterProductUseCase(this.repository);
    const shop:Shop = await usecase.apply(command);

    console.log(`Desde el comando sabemos que hay ${shop.getProducts().length} productos`);

    this.publisher.mergeObjectContext(shop);
    shop.commit();

  }

}

/* + ------------------------------ | Edit Product | ------------------------------ + */
@CommandHandler(EditProductCommand)
export class EditProductHandler implements ICommandHandler<EditProductCommand> {

  constructor(
    private readonly repository: ShopRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: EditProductCommand) {

    console.log('\n+----------------------------------------------------+');
    console.log(`\x1b[32m${inCommand}\x1b[0m` + ' Producto en proceso de edicion ...');

    let usecase = new EditProductUseCase(this.repository);
    let shop = await usecase.apply(command);

    console.log(`Desde el comando sabemos que hay ${shop.getProducts().length} productos`);
    console.log({...command});

    this.publisher.mergeObjectContext(shop);
    shop.commit();

  }

}

/* + ------------------------------ | Delete Product | ------------------------------ + */
@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler implements ICommandHandler<DeleteProductCommand> {

  constructor(
    private readonly repository: ShopRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: DeleteProductCommand) {

    console.log('\n+----------------------------------------------------+');
    console.log(`\x1b[32m${inCommand}\x1b[0m` + ' Producto en proceso de eliminacion ...');

    let usecase = new DeleteProductUseCase(this.repository);
    const shop = await usecase.apply(command);
    this.publisher.mergeObjectContext(shop);
    shop.commit();

  }

}

/* + ------------------------------ | Buy Product | ------------------------------ + */

@CommandHandler(BuyProductCommand)
export class BuyProductHandler implements ICommandHandler<BuyProductCommand> {

  constructor(
    private readonly repository: ShopRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: BuyProductCommand) {

    console.log('\n+----------------------------------------------------+');
    console.log(`\x1b[32m${inCommand}\x1b[0m` + ' Creando peticion de compra ...');

    let usecase = new BuyProductUseCase(this.repository);
    const shop = await usecase.apply(command);

    this.publisher.mergeObjectContext(shop);
    shop.commit();

  }

} 

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