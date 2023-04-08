import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ListProductService } from 'src/Application/Gateway/ProductListService';
import { Model } from 'mongoose';
import { ProductDocument, Products } from 'src/Domain/Commands/RegisterProductCommand';
import { InvoiceDocument, Invoices } from 'src/Domain/Events/ProductsPurchasedEvent';


@Injectable()
export class InvoiceRepository{

    constructor(
        @InjectModel('Invoices')
        private readonly invoiceModel: Model<InvoiceDocument>
    ){/* Void */}

    async getInvoices(): Promise<Invoices[]>{
        return await this.invoiceModel.find().exec()
    }

    async saveInvoices(invoice:Invoices): Promise<void>{
        await this.invoiceModel.create(invoice)
    }

}