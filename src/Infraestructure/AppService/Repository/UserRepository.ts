import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { v4 as autoUid } from 'uuid';

@Schema({collection:'Users'})
export class UserD{
    @Prop({unique:true, default: autoUid()})
    readonly userid:string
    @Prop()
    readonly firstName:string;
    @Prop()
    readonly lastName:string;
    @Prop()
    readonly email:string;
    @Prop({unique:true})
    readonly username:string;
    @Prop()
    readonly password:string;
}

export type UserDocument = HydratedDocument<UserD>;
export const UserSchema = SchemaFactory.createForClass(UserD)

@Injectable()
export class UserRepository{

    constructor(
        @InjectModel('Users')
        private readonly userModel: Model<UserDocument>
    ){/* Void */}

    async getUser(id:string): Promise<UserD>{
        return await this.userModel.findOne({userid:id}).exec()
    }

    async saveUser(user:UserD): Promise<void>{
        await this.userModel.create(user)
    }

}