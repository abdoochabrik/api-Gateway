import { All, Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { createProxyMiddleware } from 'http-proxy-middleware';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @All()
  async getHello(@Req() req: Request) {}
}
