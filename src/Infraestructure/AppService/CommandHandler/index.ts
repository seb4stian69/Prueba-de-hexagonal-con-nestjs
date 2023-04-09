import { BuyProductHandler, CreateClientHandler, CreateShopHandler, DeleteProductHandler, EditProductHandler, RegisterProductHandler } from "./CommandHandler";

export const CommandsHandler = [
    CreateShopHandler, 
    BuyProductHandler, RegisterProductHandler, EditProductHandler, DeleteProductHandler,
    CreateClientHandler
]
