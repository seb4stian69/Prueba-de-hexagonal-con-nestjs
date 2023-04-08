import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShopService } from 'src/Application/Gateway/ShopService';
import {  Product } from 'src/Domain/Entities/Product';
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
        ).exec();
    }

    async editProduct(product: any): Promise<void>{

        await this.productsModel.updateOne(
            {shopID:product.tenantId, "products._id":product.id},
            {$set:{"products.$._data":{
                name:product._data.name,
                inInventory:product._data.inInventory,
                isEnabled:product._data.isEnabled,
                max:product._data.max,
                min:product._data.min,
                price:product._data.price
            }}},
            {new:true}
        ).exec();

    }

    async deleteProduct(shopID:string, id:string){

        await this.productsModel.updateOne(
            {shopID:shopID, "products._id":id},
            { $pull: { products: { _id: id } } },
            {new:true}
        ).exec();

    }

}
