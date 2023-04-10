import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { ProductDeletedEvent } from 'src/Domain/Events/ProductDeletedEvent';
import { ProductEditedEvent } from 'src/Domain/Events/ProductEditedEvent';
import { ProductRegisteredEvent } from 'src/Domain/Events/ProductRegisteredEvent';
import { ProductPurchasedEvent } from 'src/Domain/Events/ProductsPurchasedEvent';
import { ShopCreatedEvent } from 'src/Domain/Events/ShopCreatedEvent';
import { ShopD } from 'src/Domain/Shop';
import { converRegisteredDataToProductEvent, convertToEditProductDataEvent } from 'src/Application/Utils/ConvertToEntity';
import { ShopRepository } from '../../Common/Repository/ShopRepository';
import { InvoiceRepository } from '../../Common/Repository/InvoiceRepository';

const inEvent: string = 'En el evento'

/* + ------------------------------ | Shop Created | ------------------------------ + */

@EventsHandler(ShopCreatedEvent)
export class ShopCreatedHandler implements IEventHandler<ShopCreatedEvent> {

  constructor(private readonly shopRepository:ShopRepository){}

  handle(event: ShopCreatedEvent) {

    const shopD: ShopD = {
      shopID:event.getShopID().id.id,
      products: event.getProducts()
    }

    this.shopRepository.addShop(shopD)

    console.log('\n' + `\x1b[32m[${inEvent}]\x1b[0m`+' Tienda creada ...'+`\nDesde el evento sabemos que hay ${event.getProducts().length} productos`);

  }

}

/* + ------------------------------ | Product Registered | ------------------------------ + */

@EventsHandler(ProductRegisteredEvent)
export class ProductRegisteredHandler implements IEventHandler<ProductRegisteredEvent> {

  constructor(private readonly shopRepository:ShopRepository){}

  handle(event: ProductRegisteredEvent) {

    this.shopRepository.addProduct(
      converRegisteredDataToProductEvent(
        event.getProductRegisteredData()
      )
    )
      
    console.log('\n' + `\x1b[32m[${inEvent}]\x1b[0m`+' Producto registrado ...');
    console.log({...event.getProductRegisteredData()}); 

  }
  
}

/* + ------------------------------ | Product edited | ------------------------------ + */

@EventsHandler(ProductEditedEvent)
export class ProductEditedHandler implements IEventHandler<ProductEditedEvent> {

  constructor(private readonly shopRepository:ShopRepository){}

  handle(event: ProductEditedEvent) {

    this.shopRepository.editProduct(
      convertToEditProductDataEvent(
        event.getEditProductData()
      )
    );

    console.log('\n' + `\x1b[32m[${inEvent}]\x1b[0m`+' Producto editado ...');
    console.log({...event.getProductEditedData()});

  }
}

/* + ------------------------------ | Product deleted | ------------------------------ + */

@EventsHandler(ProductDeletedEvent)
export class ProductDeletedHandler implements IEventHandler<ProductDeletedEvent> {
  
  constructor(private readonly shopRepository:ShopRepository){}

  handle(event: ProductDeletedEvent) {

    this.shopRepository.deleteProduct(event.getShopID().id, event.getProductID().id)

    console.log('\n' + `\x1b[32m[${inEvent}]\x1b[0m`+' Producto eliminado ...');
    console.log({shopID: event.getShopID(), productID: event.getProductID()});

  }
}

/* + ------------------------------ | Product Purchased | ------------------------------ + */

@EventsHandler(ProductPurchasedEvent)
export class ProductPurchasedHandler implements IEventHandler<ProductPurchasedEvent> {

  constructor(
    private readonly shopRepository:ShopRepository,
    private readonly invoiceRepository:InvoiceRepository
  ){}

  handle(event: ProductPurchasedEvent) {

    this.invoiceRepository.saveInvoices(event.parseToInvoiceSchame());

    event.getProductPurchasedData().products.forEach((qty, id)=>{
      this.shopRepository.buyProducts(id, qty, event.getProductPurchasedData().shopID.id)
    })

    console.log('\n' + `\x1b[32m[${inEvent}]\x1b[0m`+' Productos comprados ...');
    
  }
}
