import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class ItemService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async getItems(email: string) {
        return email;
    }
}
