export type Environment = 'development' | 'production' | 'staging' | 'ci';

export type Script = 'test:unit' | 'test:e2e' | 'start' | 'test:infra';

export type Config = Readonly<{
  env: Environment;
  script: Script;
}>;
