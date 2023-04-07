import { CqrsModule } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { RegisterProductUseCase } from '../../src/Application/UseCase/RegisterProductUseCase';
import { RegisterProductCommand,Products } from '../../src/Domain/Commands/RegisterProductCommand';

describe('RegisterProductUseCase', () => {

    let registerProductCommand: RegisterProductCommand;
    let useCase: RegisterProductUseCase;

    beforeEach(() => {

        Test.createTestingModule({
            imports:[RegisterProductCommand,RegisterProductUseCase,CqrsModule]
        })

        const Products:Products = {
            shopID:'ShopOne',
            productID:'ShopOne-ProductOne',
            name:'Queso',
            inInventory:300,
            enabled:true,
            max:10,
            min:5,
            price:100
        }

        registerProductCommand = new RegisterProductCommand(Products);
        useCase = new RegisterProductUseCase(registerProductCommand);

    });

    describe('exec', ()=> {
        it('should execute an getProducts of Shop', ()=> {

            // Assert
            expect( useCase.apply().getProducts().size ).toBe( 1 )

        });
    });

})