import { BuyProductCommand } from "src/Domain/Commands/BuyProductCommand";
import { ProductPurchasedData } from "src/Domain/Events/ProductsPurchasedEvent";
import { Shop, ShopID } from "src/Domain/Shop";
import Instant from "ts-time/Instant";

export class BuyProductUseCase{

    constructor(private readonly command: BuyProductCommand){}

    public apply():Shop{

        const shopID: ShopID = {
            id: this.command.getBuyProductData().shopID
        }

        const shop = Shop.from(null);

        const productPurchasedData: ProductPurchasedData = {
            date: Instant.now(),
            idType:this.command.getBuyProductData().idType,
            idClient:this.command.getBuyProductData().idClient,
            clientName:this.command.getBuyProductData().clientName ,
            products:this.command.getBuyProductData().products,
            shopID: shopID
        };

        shop.buyProduct(productPurchasedData);
        
        return shop;

    }

}