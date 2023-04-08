import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetUserQuery } from "./Querys/Users/GetUserQuery";
import { GetShopsQuery } from "./Querys/Shops/GetShopsQuery";
import { GetShopsByIDQuery } from "./Querys/Shops/GetShopsByIDQuery";
import { GetProductsByIdInShopQuery } from "./Querys/Products/GetProductsByIdInShopQuery";
import { GetProductsByShopQuery } from "./Querys/Products/GetProductsByShopQuery";
import { GetProductsByShopWithPaginationQuery } from "./Querys/Products/GetProductsByShopWithPaginationQuery";
import { GetProductsCollectionQuery } from "./Querys/Products/GetProductsCollectionQuery";
import { GetAllBuysByUserIDQuery } from "./Querys/Buys/GetAllBuysByUserIDQuery";
import { GetAllBuysQuery } from "./Querys/Buys/GetAllBuysQuery";
import { ShopRepository } from "../Repository/ShopRepository";
import { ShopD } from "src/Domain/Shop";
import { ProductRepository } from "../Repository/ProductRepository";
import { Products } from "src/Domain/Commands/RegisterProductCommand";
import { UserD, UserRepository } from "../Repository/UserRepository";
import { Product } from "src/Domain/Entities/Product";
import { InvoiceRepository } from "../Repository/InvoiceRepository";
import { Invoices } from "src/Domain/Events/ProductsPurchasedEvent";

/* + ------------------------------ | Users | ------------------------------ + */

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(
    private readonly userRepository:UserRepository
  ) {}
  async execute(query: GetUserQuery):  Promise<UserD> {
    return await this.userRepository.getUser(query.userID);
  }
}

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

/* + ------------------------------ | Buys | ------------------------------ + */

@QueryHandler(GetAllBuysQuery)
export class GetAllBuys implements IQueryHandler<GetAllBuysQuery> {
  constructor(
    private readonly invoiceRepository:InvoiceRepository,
  ) {}
  async execute(query: GetAllBuysQuery): Promise<Invoices[]> {
    return await this.invoiceRepository.getInvoices(query.shopID);
  }
}

@QueryHandler(GetAllBuysByUserIDQuery)
export class GetAllBuysByUserID implements IQueryHandler<GetAllBuysByUserIDQuery> {
  constructor(
    private readonly invoiceRepository:InvoiceRepository,
  ) {}
  async execute(query: GetAllBuysByUserIDQuery): Promise<Invoices[]> {
    return await this.invoiceRepository.getInvoicesByUserID(query.shopID,query.userID);
  }
}