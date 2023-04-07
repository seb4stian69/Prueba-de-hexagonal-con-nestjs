import { Products } from "src/Domain/Commands/RegisterProductCommand";
import { Product } from "src/Domain/Entities/Product";
import { Enable } from "src/Domain/Values/Enable";
import { inInventory } from "src/Domain/Values/inInventory";
import { Max } from "src/Domain/Values/Max";
import { Min } from "src/Domain/Values/Min";
import { PName } from "src/Domain/Values/PName";
import { Price } from "src/Domain/Values/Price";

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