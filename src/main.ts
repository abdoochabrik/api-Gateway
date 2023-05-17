import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtService } from '@nestjs/jwt';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { jwtConstants } from './constants';
import { extractTokenFromHeader } from './functions';
import { auth_routes } from './routes/auth-routes/auth-routes';
const SERVICE_URL = 'http://localhost:3002';
const jwtService: JwtService = new JwtService();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
    '/role',
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
