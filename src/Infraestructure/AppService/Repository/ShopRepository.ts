import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShopService } from 'src/Application/Gateway/ShopService';
import { Product } from 'src/Domain/Entities/Product';
import { ShopD, ShopDocument } from 'src/Domain/Shop';


@Injectable()
export class ShopRepository implements ShopService{

    constructor(
        @InjectModel('Shop')
        private readonly productsModel: Model<ShopDocument>
    ){/* Void */}

    async addShop(shop:ShopD):Promise<void> {
        await this.productsModel.create(shop);
    }

    async getShops():Promise<ShopD[]> {
        return await this.productsModel.find().exec();
    }

    async getShopById(id: string): Promise<ShopD>{
        return await this.productsModel.findOne({shopID:id}).exec();
    }

    async addProduct(product: Product): Promise<void>{
        await this.productsModel.updateOne(
            {shopID:product.tenantId},
            {$push:{products:{...product}}},
            {new:true}
        );
    }

}
