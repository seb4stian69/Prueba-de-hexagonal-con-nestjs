import { ProductDeletedHandler, ProductEditedHandler, ProductPurchasedHandler, ProductRegisteredHandler, ShopCreatedHandler } from "./EventHandler";

export const EventsHandler = [ShopCreatedHandler, ProductPurchasedHandler, ProductRegisteredHandler, ProductEditedHandler, ProductDeletedHandler]