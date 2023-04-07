import { CqrsModule } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { CreateShopUseCase } from '../../src/Application/UseCase/CreateShopUseCase';
import { CreateShopCommand } from '../../src/Domain/Commands/CreateShopCommand';
import { Shop, ShopID } from '../../src/Domain/Shop';
import { Product } from '../../src/Domain/Entities/Product';
import { PName } from '../../src/Domain/Values/PName';
import { inInventory } from '../../src/Domain/Values/inInventory';
import { Enable } from '../../src/Domain/Values/Enable';
import { Max } from '../../src/Domain/Values/Max';
import { Min } from '../../src/Domain/Values/Min';
import { Price } from '../../src/Domain/Values/Price';
import { when } from 'ts-mockito';
import { Mocker } from 'ts-mockito/lib/Mock';
import { mock } from 'node:test';
import { ListProductService } from '../../src/Application/Gateway/ProductListService';

describe('CreateShopUseCase', () => {

    jest.mock('../../src/Application/Gateway/ProductListService')

    let listProductService:ListProductService;
    let useCase: CreateShopUseCase;

    beforeEach(() => {

        Test.createTestingModule({
            imports:[CreateShopCommand,CreateShopUseCase,CqrsModule]
        })

    });

    describe('exec', ()=> {

        it('should execute an object of Shop', ()=> {

            //Arrange
            let command = new CreateShopCommand('ShopOne')

            //Act
            when(listProductService.obtenerProductos()).thenReturn(history())

            //Assert
            console.log(useCase.apply(command).getProducts().size)
            expect(useCase.apply(command).getProducts().size).toBe(3)

        });

    });

})

const history=():Product[]=>{

    let data:Product[] = new Set();

    const productOne: Product = new Product(
        PName.of('Yuca'),
        inInventory.of(100),
        Enable.of(true),
        Max.of(10),
        Min.of(1),
        Price.of(100),
        'ProductOne-ShopOne'
    );
    const productTwo: Product = new Product(
        PName.of('Queso'),
        inInventory.of(200),
        Enable.of(true),
        Max.of(10),
        Min.of(1),
        Price.of(100),
        'ProductTwo-ShopOne'
    );
    const productThree: Product = new Product(
        PName.of('Carne'),
        inInventory.of(300),
        Enable.of(true),
        Max.of(10),
        Min.of(1),
        Price.of(100),
        'ProductThree-ShopOne'
    );

    data.add(productOne);
    data.add(productTwo);
    data.add(productThree);

    return data

}