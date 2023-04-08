import { DeleteProductCommand } from "src/Domain/Commands/DeleteProductCommand";
import { ProductID } from "src/Domain/Entities/Product";
import { Shop, ShopD, ShopID } from "src/Domain/Shop";
import { ShopService } from "../Gateway/ShopService";
import { converShopDToShop } from "../Utils/ConvertToEntity";

export class DeleteProductUseCase{

    constructor(private readonly shopService:ShopService){}

    async apply(command: DeleteProductCommand):Promise<Shop>{

        const shopID: ShopID = {
            id: command.getShopID()
        }

        const productID: ProductID = {
            id: command.getProductID().split('-')[1],
            tenantId: command.getProductID().split('-')[0]
        }

        const shopD:ShopD = await this.shopService.getShopById(command.getShopID());
        const shop:Shop = await converShopDToShop(shopD);

        shop.setProducts(
            shop.getProducts()
                .filter(
                    product => product._id !== productID.id
                )
        )

        shop.deleteProduct(shopID, productID);

        return shop;

    }

}