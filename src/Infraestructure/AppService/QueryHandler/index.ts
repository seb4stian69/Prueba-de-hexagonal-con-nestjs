import { GetAllBuysByUserID } from "./QueryHandler";
import { GetAllBuys } from "./QueryHandler";
import { GetProductsByIdInShop, GetProductsByShop, GetProductsByShopWithPagination, GetProductsCollection, GetShopByID, GetShopsHandler, GetUserHandler } from "./QueryHandler";

export const QuerysHandler = [
    GetUserHandler,
    GetShopsHandler,GetShopByID,
    GetProductsCollection,GetProductsByShop,GetProductsByIdInShop,GetProductsByShopWithPagination,
    GetAllBuys,GetAllBuysByUserID
]