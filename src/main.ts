import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();
  await app.listen(3000);
}
bootstrap().then(() => {
  let logger = new Logger("PTNK_TTS");
  logger.log("Server started at http://localhost:3000")
})
