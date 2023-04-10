import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserController } from './user.controller';
import { CommandHandlers } from './CommandHandler';
import { EventHandlers } from './EventHandler';
import { UserRepository, UserSchema } from '../Common/Repository/UserRepository';
import { MongooseModule } from '@nestjs/mongoose';
import { InvoiceRepository } from '../Common/Repository/InvoiceRepository';
import { InvoiceSchema } from 'src/Domain/Events/ProductsPurchasedEvent';
import { QueryHandlers } from './QueryHandler';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Users', schema: UserSchema}]),
        MongooseModule.forFeature([{ name: 'Invoices', schema: InvoiceSchema}]),
        CqrsModule
    ],
    controllers: [UserController],
    providers: [
        UserRepository,
        InvoiceRepository,
        ...QueryHandlers,
        ...CommandHandlers,
        ...EventHandlers
    ],
})
export class UsersModule {}
