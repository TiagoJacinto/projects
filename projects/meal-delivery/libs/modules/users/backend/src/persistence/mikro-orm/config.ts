import { Migrator } from '@mikro-orm/migrations';
import { defineConfig } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import * as path from 'path';

export default defineConfig({
  dbName: process.env['MIKRO_ORM_DB_NAME'],
  password: process.env['MIKRO_ORM_PASSWORD'],
  // folder-based discovery setup, using common filename suffix
  entities: ['**/*.entity.js'].map((p) => path.join(__dirname, `../../${p}`)),
  entitiesTs: ['src/**/*.entity.ts'],
  // we will use the ts-morph reflection, an alternative to the default reflect-metadata provider
  // check the documentation for their differences: https://mikro-orm.io/docs/metadata-providers
  metadataProvider: TsMorphMetadataProvider,
  // enable debug mode to log SQL queries and discovery information
  debug: true,
  extensions: [Migrator],
  migrations: {
    pathTs: path.join(__dirname, './migrations'),
  },
});
