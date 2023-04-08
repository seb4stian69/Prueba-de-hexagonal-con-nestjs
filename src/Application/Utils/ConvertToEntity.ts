import { BuyProductCommand } from "src/Domain/Commands/BuyProductCommand";
import { EditProductCommand } from "src/Domain/Commands/EditProductCommand";
import { Products, RegisterProductCommand } from "src/Domain/Commands/RegisterProductCommand";
import { Product, ProductID } from "src/Domain/Entities/Product";
import { ProductEditedData } from "src/Domain/Events/ProductEditedEvent";
import { ProductRegisteredData } from "src/Domain/Events/ProductRegisteredEvent";
import { ProductPurchasedData } from "src/Domain/Events/ProductsPurchasedEvent";
import { Shop } from "src/Domain/Shop";
import { ShopD, ShopID } from "src/Domain/Shop";
import { Enable } from "src/Domain/Values/Enable";
import { inInventory } from "src/Domain/Values/inInventory";
import { Max } from "src/Domain/Values/Max";
import { Min } from "src/Domain/Values/Min";
import { PName } from "src/Domain/Values/PName";
import { Price } from "src/Domain/Values/Price";
import Instant from "ts-time/Instant";

export const convertItemToProduct=(item:Products, shopID:any):Product=>{

    return new Product(
        PName.of(item.name),
        inInventory.of(item.inInventory),
        Enable.of(item.isEnabled),
        Max.of(item.max),
        Min.of(item.min),
        Price.of(item.price),
        item.productID.replace('shopone', shopID.id)
    )

}

export const convertToRegisteredProductData=(command:RegisterProductCommand, productID:ProductID,shopID:ShopID):ProductRegisteredData=>{
    return {
        productID:productID,
        name: PName.of(command.getProduct().name),
        inInventory: inInventory.of(command.getProduct().inInventory),
        enabled: Enable.of(command.getProduct().isEnabled),
        max: Max.of(command.getProduct().max),
        min: Min.of(command.getProduct().min),
        price: Price.of(command.getProduct().price),
        shopID: shopID
    }
}

export const converRegisteredDataToProduct =(productRegisteredData:ProductRegisteredData,command:RegisterProductCommand):Product=>{
    return new Product(
        productRegisteredData.name,
        productRegisteredData.inInventory,
        productRegisteredData.enabled,
        productRegisteredData.max,
        productRegisteredData.min,
        productRegisteredData.price,
        command.getProduct().productID
    );
}
export const converRegisteredDataToProductEvent =(productRegisteredData:ProductRegisteredData):Product=>{

    return new Product(
        productRegisteredData.name,
        productRegisteredData.inInventory,
        productRegisteredData.enabled,
        productRegisteredData.max,
        productRegisteredData.min,
        productRegisteredData.price,
        productRegisteredData.productID.tenantId+'-'+productRegisteredData.productID.id
    );
}

export const converShopDToShop =(shopD:ShopD):Promise<Shop>=>{
    return Shop.fromTwo(null,shopD.products);
}

export const convertToEditProductData = (command:EditProductCommand,productID:ProductID,shopID:ShopID):ProductEditedData => {
    return {
        productID:productID,
        name: PName.of(command.getEditProductData().name),
        inInventory: inInventory.of(command.getEditProductData().inInventory),
        isEnabled: Enable.of(command.getEditProductData().isEnabled),
        max: Max.of(command.getEditProductData().max),
        min: Min.of(command.getEditProductData().min),
        price: Price.of(command.getEditProductData().price),
        shopID: shopID
    }
}

export const convertToEditProductDataEvent = (productEditedData:ProductEditedData):any => {

    return new Product(
        productEditedData.name,
        productEditedData.inInventory,
        productEditedData.isEnabled,
        productEditedData.max,
        productEditedData.min,
        productEditedData.price,
        productEditedData.productID.tenantId+'-'+productEditedData.productID.id
    );

}

export const getProductPurchasedData = (command:BuyProductCommand, shopID:ShopID):ProductPurchasedData=>{

    let map: Map<string, any> = new Map<string, number>();

    for (const [clave, valor] of Object.entries(command.getBuyProductData().products)) {
        map.set(clave, valor);
    }

    return {
        date: Instant.now(),
        idType:command.getBuyProductData().idType,
        idClient:command.getBuyProductData().idClient,
        clientName:command.getBuyProductData().clientName ,
        products:map,
        shopID: shopID
    }
}