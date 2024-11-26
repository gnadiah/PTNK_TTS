import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TtsModule } from './tts/tts.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'FE')
    }),
    TtsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
