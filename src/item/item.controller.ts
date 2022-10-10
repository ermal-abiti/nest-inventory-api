import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateItemDto } from './dtos/create-item.dto';
import { ItemService } from './item.service';

@Controller('items')
export class ItemController {
    constructor(private itemService: ItemService) {}

    @Get()
    @UseGuards(AuthGuard)
    getUserItems(@Request() request: any) {
        return this.itemService.getItems(request.user.email);
    }

    @Post()
    @UseGuards(AuthGuard)
    addUserItem(@Request() request: any, @Body() body: CreateItemDto) {
        body.creator = request.user._id;
        return this.itemService.addItem(body);
    }
}
