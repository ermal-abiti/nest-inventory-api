import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateItemDto } from './dtos/create-item.dto';
import { Item } from './schemas/item.schema';

@Injectable()
export class ItemService {
  constructor(@InjectModel(Item.name) private itemModel: Model<Item>) {}

  async getItems(email: string) {
    return this.itemModel.find({ email }).populate('creator');
  }

  async addItem(data: CreateItemDto) {
    let newItem = new this.itemModel(data);
    return newItem.save();
  }
}
