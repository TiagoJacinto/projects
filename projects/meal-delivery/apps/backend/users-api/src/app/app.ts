import * as path from 'path';
import { FastifyInstance } from 'fastify';
import AutoLoad from '@fastify/autoload';
import { z } from 'zod';
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod';
import { container } from 'tsyringe';
import { SignupController } from '@tiagojacinto/meal-delivery-users-signup-use-case';

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

  fastify.post<{
    Body: SignupSchema;
  }>(
    '/signup',
    {
      schema: {
        body: signupSchema,
      },
    },
    (req, res) => {
      container.resolve(SignupController).execute({ req, res });
    },
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
