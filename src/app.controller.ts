import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateTest } from './dtos/create-test.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  indexRoute() {
    return {
      message: 'Inventory API',
      version: '1.0.0',
      env: 'development'
    }
  }

  @Post()
  createTest(@Body() body: CreateTest) {
    return {
      message: 'success',
      result: body
    }
  }
}
