import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { InvoiceRepository } from '../Common/Repository/InvoiceRepository';
import { CommandHandlers } from './CommandHandler';
import { EventHandlers } from './EventHandler';
import { QueryHandlers } from './QueryHandler';
import { ShopRepository } from '../Common/Repository/ShopRepository';
import { MongooseModule } from '@nestjs/mongoose';
import { ShopSchema } from 'src/Domain/Shop';
import { ProductsSchema } from 'src/Domain/Commands/RegisterProductCommand';
import { InvoiceSchema } from 'src/Domain/Events/ProductsPurchasedEvent';
import { ProductRepository } from '../Common/Repository/ProductRepository';
import { ShopAndProductController } from './shop-product-products.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Products', schema: ProductsSchema}]),
        MongooseModule.forFeature([{ name: 'Shop', schema: ShopSchema}]),
        MongooseModule.forFeature([{ name: 'Invoices', schema: InvoiceSchema}]),
        CqrsModule
    ],
    controllers: [ShopAndProductController],
    providers: [
        InvoiceRepository,
        ShopRepository,
        ProductRepository,
        ...QueryHandlers,
        ...CommandHandlers,
        ...EventHandlers
    ],
})
export class ShopAndProductsModule {}
