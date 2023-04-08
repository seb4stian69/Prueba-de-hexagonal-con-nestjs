import { BuyProductCommand } from "src/Domain/Commands/BuyProductCommand";
import { ProductPurchasedData } from "src/Domain/Events/ProductsPurchasedEvent";
import { Shop, ShopD, ShopID } from "src/Domain/Shop";
import { ShopService } from "../Gateway/ShopService";
import { converShopDToShop, getProductPurchasedData } from "../Utils/ConvertToEntity";

export class BuyProductUseCase{

    constructor(private readonly shopService:ShopService){}

    async apply(command: BuyProductCommand):Promise<Shop>{

        const shopID:ShopID = {id: command.getBuyProductData().shopID}
        const shopD:ShopD = await this.shopService.getShopById(shopID.id);
        const shop:Shop = await converShopDToShop(shopD);

        const productPurchasedData: ProductPurchasedData = getProductPurchasedData(command,shopID);

        let map: Map<string, any> = new Map<string, number>();

        for (const [clave, valor] of Object.entries(command.getBuyProductData().products)) {
            map.set(clave, valor);
        }

        map.forEach((qty,id) =>{
            shop.getProducts().forEach(product=>{
                if(product._id  === id) product._data.inInventory._data.value -= qty 
            })
        })

        shop.buyProduct(productPurchasedData);
        
        return shop;

    }

}