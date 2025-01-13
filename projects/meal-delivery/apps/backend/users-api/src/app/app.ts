import 'reflect-metadata';
import AutoLoad from '@fastify/autoload';
import { RequestContext } from '@mikro-orm/core';
import { MikroORMClient } from '@tiagojacinto/database-primitives';
import { SignupController } from '@tiagojacinto/meal-delivery-users-signup-use-case';
import { type FastifyInstance } from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import * as path from 'path';
import { container } from 'tsyringe';
import { z } from 'zod';

import { config } from '../main';

/* eslint-disable-next-line */
export interface AppOptions {}

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type SignupSchema = z.infer<typeof signupSchema>;

export async function app(fastify: FastifyInstance, opts: AppOptions) {
  // Place here your custom code!

  fastify.setValidatorCompiler(validatorCompiler);
  fastify.setSerializerCompiler(serializerCompiler);
  fastify.withTypeProvider<ZodTypeProvider>();

  if (config.env === 'production') {
    fastify.addHook('onRequest', (req, reply, done) => {
      RequestContext.create(container.resolve<MikroORMClient>(MikroORMClient).em, done);
    });
  }

  fastify.post<{
    Body: SignupSchema;
  }>(
    '/signup',
    {
      schema: {
        body: signupSchema,
      },
    },
    (req, res) => container.resolve(SignupController).execute({ req, res }),
  );

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: { ...opts },
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: { ...opts },
  });
}
