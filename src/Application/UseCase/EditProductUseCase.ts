import { EditProductCommand } from "src/Domain/Commands/EditProductCommand";
import { ProductID } from "src/Domain/Entities/Product";
import { ProductEditedData } from "src/Domain/Events/ProductEditedEvent";
import { Shop, ShopID } from "src/Domain/Shop";
import { Enable } from "src/Domain/Values/Enable";
import { inInventory } from "src/Domain/Values/inInventory";
import { Max } from 'src/Domain/Values/Max';
import { Min } from 'src/Domain/Values/Min';
import { PName } from "src/Domain/Values/PName";
import { Price } from 'src/Domain/Values/Price';

export class EditProductUseCase{

    constructor(private readonly command: EditProductCommand){}

    public apply():Shop{

        const shopID: ShopID = {
            id: this.command.getEditProductData().shopID
        }

        const productID: ProductID = {
            id: this.command.getEditProductData().productID.split('-')[0],
            tenantId: this.command.getEditProductData().productID.split('-')[1]
        }

        const shop = Shop.from(null);

        const productEditedData: ProductEditedData = {
            productID:productID,
            name: PName.of(this.command.getEditProductData().name),
            inInventory: inInventory.of(this.command.getEditProductData().inInventory),
            enabled: Enable.of(this.command.getEditProductData().enabled),
            max: Max.of(this.command.getEditProductData().max),
            min: Min.of(this.command.getEditProductData().min),
            price: Price.of(this.command.getEditProductData().price),
            shopID: shopID
        };

        shop.editProduct(productEditedData);

        return shop;
        
    }

}