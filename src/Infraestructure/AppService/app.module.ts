import { ShopRepository } from './Repository/ShopRepository';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandsHandler } from './CommandHandler';
import { EventsHandler } from './EventHandler';
import { ProductRepository } from './Repository/ProductRepository';
import { ProductsSchema } from 'src/Domain/Commands/RegisterProductCommand';
import { ShopSchema } from 'src/Domain/Shop';
import { InvoiceSchema } from 'src/Domain/Events/ProductsPurchasedEvent';
import { InvoiceRepository } from './Repository/InvoiceRepository';
import { QuerysHandler } from './QueryHandler';
import { UserRepository, UserSchema } from './Repository/UserRepository';

@Module({

  imports: [
    MongooseModule.forRoot('mongodb+srv://sebastiansantis:0oiH1Z0QJLomg6e7@springbootcluster.koaqqah.mongodb.net/SofkaShop-NestJS?retryWrites=true&w=majority',{useNewUrlParser:true}),
    MongooseModule.forFeature([{ name: 'Products', schema: ProductsSchema}]),
    MongooseModule.forFeature([{ name: 'Shop', schema: ShopSchema}]),
    MongooseModule.forFeature([{ name: 'Invoices', schema: InvoiceSchema}]),
    MongooseModule.forFeature([{ name: 'Users', schema: UserSchema}]),
    CqrsModule
  ],
  
  controllers: [AppController],

  providers: [
    AppService,
    ShopRepository,
    ProductRepository,
    InvoiceRepository,
    UserRepository,
    ...QuerysHandler,
    ...CommandsHandler,
    ...EventsHandler,
  ],

})
export class AppModule {}
