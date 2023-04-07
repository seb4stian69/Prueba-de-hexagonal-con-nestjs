import { CqrsModule } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { EditProductUseCase } from '../../src/Application/UseCase/EditProductUseCase';
import { EditProductCommand,EditProductData } from '../../src/Domain/Commands/EditProductCommand';

describe('EditProductUseCase', () => {

    let editProductCommand: EditProductCommand;
    let useCase: EditProductUseCase;

    beforeEach(() => {

        Test.createTestingModule({
            imports:[EditProductCommand,EditProductUseCase,CqrsModule]
        })

        const editProductData:EditProductData = {
            shopID:'ShopOne',
            productID:'ShopOne-ProductOne',
            name:'Queso',
            inInventory:300,
            enabled:true,
            max:10,
            min:5,
            price:100
        }

        editProductCommand = new EditProductCommand(editProductData);
        useCase = new EditProductUseCase(editProductCommand);

    });

    describe('exec', ()=> {
        it('should execute an getProducts of Shop', ()=> {
            expect( useCase.apply().getProducts().size ).toBe( 1 )
        });
    });

})