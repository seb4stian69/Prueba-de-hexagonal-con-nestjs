import { Product } from './../../Domain/Entities/Product';
import { RegisterProductCommand } from "../..//Domain/Commands/RegisterProductCommand";
import { ProductID } from "../..//Domain/Entities/Product";
import { ProductRegisteredData } from "../..//Domain/Events/ProductRegisteredEvent";
import { Shop, ShopD, ShopID } from "../..//Domain/Shop";
import { ShopService } from '../Gateway/ShopService';
import { converRegisteredDataToProduct, converShopDToShop, convertToRegisteredProductData } from '../Utils/ConvertToEntity';

export class RegisterProductUseCase{

    constructor(private readonly shopService:ShopService){}

    async apply(command: RegisterProductCommand):Promise<Shop>{

        const shopID: ShopID = {id: command.getProduct().shopID}

        const productID: ProductID = {
            id: command.getProduct().productID.split('-')[1],
            tenantId: command.getProduct().productID.split('-')[0]
        }

        const shopD:ShopD = await this.shopService.getShopById(command.getShopID());
        const shop:Shop = await converShopDToShop(shopD);
        const productRegisteredData: ProductRegisteredData = convertToRegisteredProductData(command,productID,shopID);
        const product:Product = converRegisteredDataToProduct(productRegisteredData,command);

        shop.getProducts().push(product)
        shop.registerProduct(productRegisteredData);

        return shop;

    }

}