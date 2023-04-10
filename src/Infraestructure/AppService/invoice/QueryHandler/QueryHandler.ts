import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Invoices } from "src/Domain/Events/ProductsPurchasedEvent";
import { InvoiceRepository } from "../../Common/Repository/InvoiceRepository";
import { GetAllBuysByUserIDQuery } from "./Query/GetAllBuysByUserIDQuery";
import { GetAllBuysQuery } from "./Query/GetAllBuysQuery";

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