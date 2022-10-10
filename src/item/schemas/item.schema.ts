import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from 'mongoose';
import { User } from "src/auth/schemas/user.schema";

export type ItemDocument = Item & Document;

@Schema()
export class Item {
    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    creator: User;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
