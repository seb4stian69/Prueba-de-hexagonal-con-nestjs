import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { InvoiceModule } from "./invoice/invoice.module";
import { UserSchema } from "./Common/Repository/UserRepository";
import { ShopAndProductsModule } from "./shop-and-products/shop-and-products.module";
import { UsersModule } from "./users/users.module";


@Module({

  imports: [

    MongooseModule.forRoot(
      'mongodb+srv://sebastiansantis:0oiH1Z0QJLomg6e7@springbootcluster.koaqqah.mongodb.net/SofkaShop-NestJS?retryWrites=true&w=majority',
      {useNewUrlParser:true}
    ),
    CqrsModule,

    InvoiceModule,
    ShopAndProductsModule,
    UsersModule

  ],
  
  controllers: [],
  providers: [],

})
export class AppModule {}
