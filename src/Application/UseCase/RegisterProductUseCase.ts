import { Product } from './../../Domain/Entities/Product';
import { RegisterProductCommand } from "../..//Domain/Commands/RegisterProductCommand";
import { ProductID } from "../..//Domain/Entities/Product";
import { ProductRegisteredData } from "../..//Domain/Events/ProductRegisteredEvent";
import { Shop, ShopID } from "../..//Domain/Shop";
import { Enable } from "../..//Domain/Values/Enable";
import { inInventory } from "../..//Domain/Values/inInventory";
import { Max } from '../..//Domain/Values/Max';
import { Min } from '../..//Domain/Values/Min';
import { PName } from "../..//Domain/Values/PName";
import { Price } from '../..//Domain/Values/Price';

export class RegisterProductUseCase{

    constructor(private readonly command: RegisterProductCommand){}

    public apply():Shop{

        const shopID: ShopID = {
            id: this.command.getProducts().shopID
        }

        const productID: ProductID = {
            id: this.command.getProducts().productID.split('-')[1],
            tenantId: this.command.getProducts().productID.split('-')[0]
        }

        const shop = Shop.from(null);

        const productRegisteredData: ProductRegisteredData = {
            productID:productID,
            name: PName.of(this.command.getProducts().name),
            inInventory: inInventory.of(this.command.getProducts().inInventory),
            enabled: Enable.of(this.command.getProducts().enabled),
            max: Max.of(this.command.getProducts().max),
            min: Min.of(this.command.getProducts().min),
            price: Price.of(this.command.getProducts().price),
            shopID: shopID
        };


        const product:Product = new Product(
            productRegisteredData.name,
            productRegisteredData.inInventory,
            productRegisteredData.enabled,
            productRegisteredData.max,
            productRegisteredData.min,
            productRegisteredData.price,
            this.command.getProducts().productID
        );

        shop.getProducts().push(product)

        shop.registerProduct(productRegisteredData);

        return shop;

    }

}