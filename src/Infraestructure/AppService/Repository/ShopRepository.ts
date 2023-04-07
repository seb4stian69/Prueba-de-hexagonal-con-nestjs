import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShopD, ShopDocument } from 'src/Domain/Shop';


@Injectable()
export class ShopRepository{

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

}
