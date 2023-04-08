import { EditProductCommand } from "src/Domain/Commands/EditProductCommand";
import { ProductID } from "src/Domain/Entities/Product";
import { ProductEditedData } from "src/Domain/Events/ProductEditedEvent";
import { Shop, ShopD, ShopID } from "src/Domain/Shop";
import { ShopService } from "../Gateway/ShopService";
import { converShopDToShop, convertToEditProductData, convertToEditProductDataEvent } from "../Utils/ConvertToEntity";

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

        shop.getProducts().forEach(product => console.log('before - '+product._data.name._data.value));

        shop.getProducts().forEach(product =>{
            if(product._id == productEditedData.productID.id){

                const update = convertToEditProductDataEvent(productEditedData)

                product._data.name = update._data.name;
                product._data.inInventory = update._data.inInventory;
                product._data.isEnabled = update._data.isEnabled;
                product._data.max = update._data.max;
                product._data.min = update._data.min;
                product._data.min = update._data.price;

            }
        })

        shop.editProduct(productEditedData);

        return shop;
        
    }

}