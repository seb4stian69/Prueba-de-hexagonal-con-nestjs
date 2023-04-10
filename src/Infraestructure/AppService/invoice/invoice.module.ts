import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { InvoiceController } from './invoice.controller';
import { QueryHandlers } from './QueryHandler';
import { InvoiceRepository } from '../Common/Repository/InvoiceRepository';
import { MongooseModule } from '@nestjs/mongoose';
import { InvoiceSchema } from 'src/Domain/Events/ProductsPurchasedEvent';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Invoices', schema: InvoiceSchema}]),
        CqrsModule
    ],
    controllers: [InvoiceController],
    providers: [
        InvoiceRepository,
        ...QueryHandlers,
    ],
})
export class InvoiceModule {}
