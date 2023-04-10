import { GetProductsByIdInShop, GetProductsByShop, GetProductsByShopWithPagination, GetProductsCollection, GetShopByID, GetShopsHandler } from "./QueryHandler";

export const QueryHandlers = [GetShopsHandler, GetShopByID, GetProductsCollection, GetProductsByShop, GetProductsByShopWithPagination, GetProductsByIdInShop]