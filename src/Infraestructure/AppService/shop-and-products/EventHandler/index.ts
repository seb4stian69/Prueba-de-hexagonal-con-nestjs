import { ProductEditedHandler } from "./EventHandler";
import { ProductPurchasedHandler } from "./EventHandler";
import { ProductDeletedHandler } from "./EventHandler";
import { ProductRegisteredHandler } from "./EventHandler";
import { ShopCreatedHandler } from "./EventHandler";

export const EventHandlers = [ShopCreatedHandler, ProductRegisteredHandler, ProductEditedHandler, ProductDeletedHandler, ProductPurchasedHandler]