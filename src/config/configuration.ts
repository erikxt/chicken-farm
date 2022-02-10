import { ConfigModule } from '@nestjs/config';

export default function configGenerator() {
  const mode = process.env.NODE_ENV || 'prod';
  const envFilePath =
    mode === 'dev'
      ? ['.env.development.local', '.env.development', '.env']
      : ['.env.production.local', '.env.production', '.env'];

  return ConfigModule.forRoot({ isGlobal: true, envFilePath: envFilePath });
}