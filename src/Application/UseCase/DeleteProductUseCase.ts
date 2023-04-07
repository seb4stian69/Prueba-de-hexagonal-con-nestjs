import { DeleteProductCommand } from "src/Domain/Commands/DeleteProductCommand";
import { ProductID } from "src/Domain/Entities/Product";
import { Shop, ShopID } from "src/Domain/Shop";

export class DeleteProductUseCase{

    constructor(private readonly command: DeleteProductCommand){}

    public apply():Shop{

        const shopID: ShopID = {
            id: this.command.getShopID()
        }

        const productID: ProductID = {
            id: this.command.getProductID().split('-')[0],
            tenantId: this.command.getProductID().split('-')[1]
        }

        const shop = Shop.from(null);

        shop.deleteProduct(shopID, productID);

        return shop;

    }

}