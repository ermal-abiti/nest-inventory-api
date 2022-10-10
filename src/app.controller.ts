import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  indexRoute() {
    return {
      message: 'Inventory API',
      version: '1.0.0',
      env: process.env.ENVIRONMENT || 'development'
    }
  }
}
