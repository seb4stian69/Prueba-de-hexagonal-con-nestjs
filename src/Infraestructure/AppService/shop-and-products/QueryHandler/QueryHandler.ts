import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ShopD } from "src/Domain/Shop";
import { GetShopsByIDQuery } from "./Query/Shop/GetShopsByIDQuery";
import { ShopRepository } from "../../Common/Repository/ShopRepository";
import { GetProductsCollectionQuery } from "./Query/Products/GetProductsCollectionQuery";
import { ProductRepository } from "../../Common/Repository/ProductRepository";
import { Products } from "src/Domain/Commands/RegisterProductCommand";
import { GetProductsByShopQuery } from "./Query/Products/GetProductsByShopQuery";
import { Product } from "src/Domain/Entities/Product";
import { GetProductsByShopWithPaginationQuery } from "./Query/Products/GetProductsByShopWithPaginationQuery";
import { GetProductsByIdInShopQuery } from "./Query/Products/GetProductsByIdInShopQuery";
import { GetShopsQuery } from "./Query/Shop/GetShopsQuery";

/* + ------------------------------ | Shops | ------------------------------ + */

@QueryHandler(GetShopsQuery)
export class GetShopsHandler implements IQueryHandler<GetShopsQuery> {
  constructor(
    private readonly shopRepository:ShopRepository,
  ) {}
  async execute(query: GetShopsQuery): Promise<ShopD[]> {
    return await this.shopRepository.getShops();
  }
}

@QueryHandler(GetShopsByIDQuery)
export class GetShopByID implements IQueryHandler<GetShopsByIDQuery> {
  constructor(
    private readonly shopRepository:ShopRepository,
  ) {}
  async execute(query: GetShopsByIDQuery): Promise<ShopD> {
    return await this.shopRepository.getShopById(query.shopID);
  }
}

/* + ------------------------------ | Products | ------------------------------ + */

@QueryHandler(GetProductsCollectionQuery)
export class GetProductsCollection implements IQueryHandler<GetProductsCollectionQuery> {
  constructor(
    private readonly productRepository:ProductRepository,
  ) {}
  async execute(query: GetProductsCollectionQuery):Promise<Products[]> {
    return await this.productRepository.getProducts();
  }
}

@QueryHandler(GetProductsByShopQuery)
export class GetProductsByShop implements IQueryHandler<GetProductsByShopQuery> {
  constructor(
    private readonly shopRepository:ShopRepository,
  ) {}
  async execute(query: GetProductsByShopQuery): Promise<Product[]> {
    return await this.shopRepository.getShopProducts(query.shopID);
  }
}

@QueryHandler(GetProductsByShopWithPaginationQuery)
export class GetProductsByShopWithPagination implements IQueryHandler<GetProductsByShopWithPaginationQuery> {
  constructor(
    private readonly shopRepository:ShopRepository,
  ) {}
  async execute(query: GetProductsByShopWithPaginationQuery): Promise<Product[]> {
    return await this.shopRepository.getShopProductsWitPagination(query.shopID, query.page, query.limit);
  }
}

@QueryHandler(GetProductsByIdInShopQuery)
export class GetProductsByIdInShop implements IQueryHandler<GetProductsByIdInShopQuery> {
  constructor(
    private readonly shopRepository:ShopRepository
  ) {}
  async execute(query: GetProductsByIdInShopQuery): Promise<Product> {
    return await this.shopRepository.getShopProductsByProductid(query.shopID, query.productID);
  }
}
