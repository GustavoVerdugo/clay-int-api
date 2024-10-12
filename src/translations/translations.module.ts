import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TranslationsController } from './translations.controller';
import { TranslationsService } from './translations.service';
import { Translation, TranslationSchema } from './translation.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Translation.name, schema: TranslationSchema }])],
  controllers: [TranslationsController],
  providers: [TranslationsService],
})
export class TranslationsModule { }
