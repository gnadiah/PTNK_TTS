import { Controller, Get, Query } from '@nestjs/common';
import * as googleTTS from 'google-tts-api';

@Controller('tts')
export class TtsController {
  @Get()
  getTtsResult(@Query('text') text: string, @Query('lang') lang: string) {
    return googleTTS.getAudioBase64(text, {
      lang,
      host: 'https://translate.google.com',
    });
  }
}
