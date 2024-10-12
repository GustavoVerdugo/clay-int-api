import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TranslationsService } from './translations.service';
import { Translation } from './translation.schema';
import { ApiTags, ApiResponse, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('translations')
@Controller('translations')
export class TranslationsController {
  constructor(private readonly translationsService: TranslationsService) { }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva traducción' })
  @ApiBody({
    description: 'Detalles de las traducciones que se desean crear',
    type: Translation,
  })
  @ApiResponse({ status: 201, description: 'Traducción creada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Solicitud inválida.' })
  async create(
    @Body() body: { key: string; translations: { language: string; value: string }[] }
  ): Promise<Translation> {
    return this.translationsService.create(body.key, body.translations);
  }


  @Get()
  @ApiOperation({ summary: 'Obtener todas las traducciones' })
  @ApiResponse({ status: 200, description: 'Lista de traducciones.', type: [Translation] })
  async findAll(): Promise<Translation[]> {
    return this.translationsService.findAll();
  }

  @Put(':key')
  @ApiOperation({ summary: 'Actualizar traducciones existentes para una clave' })
  @ApiParam({ name: 'key', description: 'Clave de la traducción a actualizar' }) // Add the key param
  @ApiBody({
    description: 'Array de traducciones a actualizar, incluyendo el valor y el idioma',
    type: Translation,
  })
  @ApiResponse({ status: 200, description: 'Traducciones actualizadas exitosamente.', type: Translation })
  @ApiResponse({ status: 404, description: 'Traducción no encontrada.' })
  async update(
    @Param('key') key: string,
    @Body() body: { translations: { value: string; language: string }[] }
  ): Promise<Translation> {
    return this.translationsService.updateMultiple(key, body.translations);
  }

  @Get(':key/:language')
  @ApiOperation({ summary: 'Obtener una traducción por clave y idioma' })
  @ApiResponse({ status: 200, description: 'Traducción encontrada.', type: Translation })
  @ApiResponse({ status: 404, description: 'Traducción no encontrada.' })
  async findOne(
    @Param('key') key: string,
    @Param('language') language: string
  ): Promise<Translation> {
    return this.translationsService.findOne(key, language);
  }

  @Get('/all/language/:language')
  @ApiOperation({ summary: 'Obtener todas las traducciones de un idioma' })
  @ApiResponse({ status: 200, description: 'Lista de traducciones encontradas.', type: [Translation] })
  @ApiResponse({ status: 404, description: 'No se encontraron traducciones para este idioma.' })
  async findAllByLanguage(@Param('language') language: string): Promise<Translation[]> {
    return this.translationsService.findAllByLanguage(language);
  }

  @Delete(':key/:language')
  @ApiOperation({ summary: 'Eliminar una traducción por clave y idioma' })
  @ApiResponse({ status: 200, description: 'Traducción eliminada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Traducción no encontrada.' })
  async delete(
    @Param('key') key: string,
    @Param('language') language: string
  ): Promise<Translation> {
    return this.translationsService.delete(key, language);
  }
}
