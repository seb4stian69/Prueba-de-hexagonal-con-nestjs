import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InvoiceDocument, Invoices } from 'src/Domain/Events/ProductsPurchasedEvent';

@Injectable()
export class InvoiceRepository{

    constructor(
        @InjectModel('Invoices')
        private readonly invoiceModel: Model<InvoiceDocument>
    ){/* Void */}

    async getInvoices(shopid:string): Promise<Invoices[]>{
        return await this.invoiceModel.find({shopID:shopid}).exec()
    }

    async getInvoicesByUserID(shopid:string,userid:string): Promise<Invoices[]>{
        return await this.invoiceModel.find({shopID:shopid, idClient:userid}).exec()
    }

    async saveInvoices(invoice:Invoices): Promise<void>{
        await this.invoiceModel.create(invoice)
    }

}