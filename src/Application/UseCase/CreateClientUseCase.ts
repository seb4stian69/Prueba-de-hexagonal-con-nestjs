import { Shop } from "../../Domain/Shop";
import { CreateClientCommand } from "src/Domain/Commands/CreateClientCommand";
import { getClientCreatedData } from "../Utils/ConvertToEntity";

export class CreateClientUseCase{

  constructor(){/* Void */}

  async apply(command: CreateClientCommand):Promise<Shop> {
    const shop:Shop = new Shop();
    shop.createClient(getClientCreatedData(command))
    return shop;
  }
      
}

