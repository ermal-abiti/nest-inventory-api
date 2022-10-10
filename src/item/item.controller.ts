import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { ItemService } from './item.service';

@Controller('items')
export class ItemController {
    constructor(private itemService: ItemService) {}

    @Get()
    @UseGuards(AuthGuard)
    async getUserItems(@Request() request: any) {
        return this.itemService.getItems(request.user.email);
    }
}
