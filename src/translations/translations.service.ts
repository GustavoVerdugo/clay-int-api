import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Translation, TranslationDocument } from './translation.schema';

@Injectable()
export class TranslationsService {
  constructor(
    @InjectModel(Translation.name) private translationModel: Model<TranslationDocument>,
  ) { }

  async create(key: string, translationsArray: { language: string; value: string }[]): Promise<Translation> {
    const existingTranslation = await this.translationModel.findOne({ key });

    if (existingTranslation) {
      for (const translation of translationsArray) {
        const existingLang = existingTranslation.translations.find(
          (t) => t.language === translation.language,
        );
        if (existingLang) {
          existingLang.value = translation.value;
        } else {
          existingTranslation.translations.push(translation);
        }
      }
      return await existingTranslation.save();
    } else {
      const newTranslation = new this.translationModel({
        key,
        translations: translationsArray,
      });
      return await newTranslation.save();
    }
  }


  async updateMultiple(key: string, translations: { value: string; language: string }[]): Promise<Translation> {
    const existingTranslation = await this.translationModel.findOne({ key });
    if (!existingTranslation) {
      throw new NotFoundException('Translation not found');
    }
    for (const { value, language } of translations) {
      const translationEntry = existingTranslation.translations.find(
        (t) => t.language === language,
      );
      if (translationEntry) {
        translationEntry.value = value;
      } else {
        existingTranslation.translations.push({ language, value });
      }
    }
    await existingTranslation.save();
    return existingTranslation;
  }


  async findAll(): Promise<TranslationDocument[]> {
    const translations = await this.translationModel.find();
    if (!translations || translations.length === 0) {
      throw new NotFoundException('No translations found');
    }
    return translations;
  }

  async findAllByLanguage(language: string): Promise<TranslationDocument[]> {
    const translations = await this.translationModel.find({
      'translations.language': language,
    });

    if (!translations || translations.length === 0) {
      throw new NotFoundException('No translations found for this language');
    }

    return translations;
  }

  async findOne(key: string, language: string): Promise<TranslationDocument> {
    const translation = await this.translationModel.findOne({
      key,
      'translations.language': language,
    });

    if (!translation) {
      throw new NotFoundException('Translation not found');
    }

    return translation;
  }

  async delete(key: string, language: string): Promise<TranslationDocument> {
    const existingTranslation = await this.translationModel.findOne({ key });

    if (!existingTranslation) {
      throw new NotFoundException('Translation not found');
    }

    const index = existingTranslation.translations.findIndex(
      (t) => t.language === language,
    );

    if (index === -1) {
      throw new NotFoundException('Translation for this language not found');
    }

    existingTranslation.translations.splice(index, 1);

    if (existingTranslation.translations.length === 0) {
      await this.translationModel.findOneAndDelete({ key });
    } else {
      await existingTranslation.save();
    }

    return existingTranslation;
  }
}
