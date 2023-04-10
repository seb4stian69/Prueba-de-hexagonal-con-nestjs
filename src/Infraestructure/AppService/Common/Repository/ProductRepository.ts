import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ListProductService } from 'src/Application/Gateway/ProductListService';
import { Model } from 'mongoose';
import { ProductDocument, Products } from 'src/Domain/Commands/RegisterProductCommand';


@Injectable()
export class ProductRepository implements ListProductService{

    constructor(
        @InjectModel('Products')
        private readonly productsModel: Model<ProductDocument>
    ){/* Void */}

    async getProducts(): Promise<Products[]>{
        return await this.productsModel.find().exec()
    }

}