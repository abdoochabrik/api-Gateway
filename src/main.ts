import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const { createProxyMiddleware } = require('http-proxy-middleware');

const ROUTES = [
  {
    url: '/free',
    auth: false,
    creditCheck: false,
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 5,
    },
    proxy: {
      target: 'http://localhost:3002/authentication/login',
      changeOrigin: true,
      pathRewrite: {
        [`^/free`]: '',
      },
    },
  },
  {
    url: '/premium',
    auth: true,
    creditCheck: true,
    proxy: {
      target: 'https://www.google.com',
      changeOrigin: true,
      pathRewrite: {
        [`^/premium`]: '',
      },
    },
  },
];

exports.ROUTES = ROUTES;
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
  });
  ROUTES.forEach((r: any) => {
    app.use(r.url, createProxyMiddleware(r.proxy));
  });
  await app.listen(3004);
}
bootstrap();
