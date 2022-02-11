import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import * as glob from 'fast-glob';
import { readdirSync } from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    return this.appService.getHello();
  }
}
