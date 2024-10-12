import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

class TranslationEntry {
  @ApiProperty({ description: 'El idioma de la traducción', example: 'es' })
  @Prop({ required: true })
  language: string;

  @ApiProperty({ description: 'El valor traducido', example: 'Hola' })
  @Prop({ required: true })
  value: string;
}

@Schema()
export class Translation extends Document {
  @ApiProperty({ description: 'La clave de la traducción', example: 'greeting' })
  @Prop({ required: true, unique: true })
  key: string;

  @ApiProperty({
    description: 'Lista de traducciones para diferentes idiomas',
    type: [TranslationEntry],
  })
  @Prop({ type: [{ language: String, value: String }], required: true })
  translations: TranslationEntry[];
}

export const TranslationSchema = SchemaFactory.createForClass(Translation);
export type TranslationDocument = Translation & Document;
