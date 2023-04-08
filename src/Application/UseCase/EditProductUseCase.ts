import { EditProductCommand } from "src/Domain/Commands/EditProductCommand";
import { ProductID } from "src/Domain/Entities/Product";
import { ProductEditedData } from "src/Domain/Events/ProductEditedEvent";
import { Shop, ShopD, ShopID } from "src/Domain/Shop";
import { ShopService } from "../Gateway/ShopService";
import { converShopDToShop, convertToEditProductData } from "../Utils/ConvertToEntity";

export class EditProductUseCase{

    constructor(private readonly shopService:ShopService){}

    async apply(command: EditProductCommand):Promise<Shop>{

        const shopID: ShopID = {id: command.getEditProductData().shopID}

        const productID: ProductID = {
            id: command.getEditProductData().productID.split('-')[1],
            tenantId: command.getEditProductData().productID.split('-')[0]
        }

        const shopD:ShopD = await this.shopService.getShopById(command.getShopID());
        const shop:Shop = await converShopDToShop(shopD);
        const productEditedData: ProductEditedData = convertToEditProductData(command,productID,shopID);

        shop.editProduct(productEditedData);

        return shop;
        
    }

}