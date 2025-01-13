import { type Config, registerApp } from '@tiagojacinto/meal-delivery-users-backend';
import Fastify from 'fastify';

import { app } from './app/app';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

export const config: Config = {
  script: 'start',
  env: 'production',
};

// Instantiate Fastify with some config
const server = Fastify({
  logger: true,
});

async function bootstrap() {
  await registerApp(config);

  // Register your application as a normal plugin.
  server.register(app);

  // Start listening.
  server.listen({ port, host }, (err) => {
    if (err) {
      server.log.error(err);
      process.exit(1);
    } else {
      console.log(`[ ready ] http://${host}:${port}`);
    }
  });
}

void bootstrap();
