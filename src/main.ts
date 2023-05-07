import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtService } from '@nestjs/jwt';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { jwtConstants } from './constants';
import { extractTokenFromHeader } from './functions';
import { auth_routes } from './routes/auth-routes/auth-routes';
import { book_routes } from './routes/book-routes/book-routes';
const SERVICE_URL = 'http://localhost:3002';
const ROUTES = [...book_routes];
const AUTH_ROUTES = [
  ...auth_routes,
  /*{
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
    proxy: {
      target: `${SERVICE_URL}`,
      changeOrigin: true,
      pathRewrite: {
        [`^/premium`]: '',
      },
    },
  },*/
];
const jwtService: JwtService = new JwtService();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
  });
  AUTH_ROUTES.forEach((route) => {
    app.use(
      route.url,
      createProxyMiddleware({
        target: SERVICE_URL,
        changeOrigin: true,
      }),
    );
  });
  app.use(
    '/book/**',
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
  app.use(
    '/profile/**',
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
  app.use(
    '/role/**',
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
  app.use(
    '/user/**',
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

  await app.listen(3004);
}
bootstrap();
