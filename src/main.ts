import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtService } from '@nestjs/jwt';
//const { createProxyMiddleware } = require('http-proxy-middleware');
import { createProxyMiddleware } from 'http-proxy-middleware';
import { jwtConstants } from './constants';
import { extractTokenFromHeader } from './functions';
const SERVICE_URL = 'http://localhost:3002';

//localhost:3002/book
const ROUTES = [
  {
    url: '/login',
    auth: false,
    creditCheck: false,
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 5,
    },
    proxy: {
      target: `${SERVICE_URL}/authentication`,
      changeOrigin: true,
      pathRewrite: {
        [`^/free`]: '',
      },
    },
  },
  {
    url: '/book',
    auth: true,
    creditCheck: true,
    /* onProxyReq: (clientRequest, req) => {
      return false;
    },*/
    proxy: {
      target: `${SERVICE_URL}`,
      changeOrigin: true,
      pathRewrite: {
        [`^/premium`]: '',
      },
    },
  },
];
const jwtService: JwtService = new JwtService();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
  });
  app.use(
    '/book',
    createProxyMiddleware({
      target: SERVICE_URL,
      changeOrigin: true,
      onProxyReq: (clientRequest, req, res) => {
        const token = clientRequest.getHeaders().authorization;
        if (!token) {
          return res.status(401).send('Unauthorized');
        }
        const result = jwtService.verifyAsync(extractTokenFromHeader(token), {
          secret: jwtConstants.secret,
        });
        result.catch(() => {
          return res.status(401).send('Unauthorized');
        });
      },
    }),
  );
  /*ROUTES.forEach((r: any) => {
    app.use(r.url, createProxyMiddleware(r.proxy));
  });*/
  await app.listen(3004);
}
bootstrap();
