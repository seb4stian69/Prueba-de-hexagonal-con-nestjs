import { CreateShopCommand } from "src/Domain/Commands/CreateShopCommand";
import { Shop, ShopID } from "../../Domain/Shop";
import { ListProductService } from "../Gateway/ProductListService";
import { convertItemToProduct } from "../Utils/ConvertToEntity";
import { Product } from "src/Domain/Entities/Product";
import { Products } from "src/Domain/Commands/RegisterProductCommand";

export class CreateShopUseCase{

  constructor(private listProductService:ListProductService){/* Void */}

  async apply(command: CreateShopCommand):Promise<Shop> {
    const shopID: ShopID = { id: command.getShopID() };
    const products: Product[] = await this.fillProducts(command.getShopID());
    const shop: Shop = await Shop.fromTwo(shopID, products);
    return shop;
  }
      
  async fillProducts(shopID:string): Promise<Product[]> {
    const data: Products[] = await this.listProductService.getProducts();
    const products: Product[] = new Array();
    data.forEach((item) => {
      products.push(convertItemToProduct(item,shopID));
    });
    return products;
  }

}

