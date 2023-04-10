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
        private readonly shopModel: Model<ShopDocument>
    ){/* Void */}

    async addShop(shop:ShopD):Promise<void> {
        await this.shopModel.create(shop);
    }

    async getShops():Promise<ShopD[]> {
        return await this.shopModel.find().exec();
    }

    async getShopById(id: string): Promise<ShopD>{
        return await this.shopModel.findOne({shopID:id}).exec();
    }

    async getShopProducts(id: string): Promise<Product[]>{
        return (await this.shopModel.findOne({shopID:id}).exec()).products;
    }

    async getShopProductsByProductid(shopid: string,productid: string): Promise<Product>{
        return await this.shopModel.findOne({ 'products._id': productid }, { 'products.$': 1 });
    }

    async getShopProductsWitPagination(shopid:string, page:number, limit:number): Promise<Product[]>{
        const collection = await this.shopModel.findOne({shopID:shopid}, { products: { $slice: [(page - 1) * limit, limit] } });
        return collection.products;
    }

    async addProduct(product: Product): Promise<void>{
        await this.shopModel.updateOne(
            {shopID:product.tenantId},
            {$push:{products:{...product}}},
            {new:true}
        ).exec();
    }

    async editProduct(product: any): Promise<void>{

        await this.shopModel.updateOne(
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

        await this.shopModel.updateOne(
            {shopID:shopID, "products._id":id},
            { $pull: { products: { _id: id } } },
            {new:true}
        ).exec();

    }

    async buyProducts(id:string, qty:number, shopID:string){

        await this.shopModel.updateOne(
            {shopID:shopID, "products._id":id},
            { $inc: { 'products.$._data.inInventory._data.value': -qty } },
            {new:true}
        ).exec();

    }

}
