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

@Module({

  imports: [
    MongooseModule.forRoot('mongodb+srv://sebastiansantis:0oiH1Z0QJLomg6e7@springbootcluster.koaqqah.mongodb.net/SofkaShop-NestJS?retryWrites=true&w=majority',{useNewUrlParser:true}),
    MongooseModule.forFeature([{ name: 'Products', schema: ProductsSchema}]),
    MongooseModule.forFeature([{ name: 'Shop', schema: ShopSchema}]),
    CqrsModule
  ],
  
  controllers: [AppController],

  providers: [
    AppService,
    ShopRepository,
    ProductRepository,
    ...CommandsHandler,
    ...EventsHandler,
  ],

})
export class AppModule {}
