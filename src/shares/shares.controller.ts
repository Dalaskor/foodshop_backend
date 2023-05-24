import { CreateShareDto, Share } from '@app/models';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SharesService } from './shares.service';

@ApiTags('Акции')
@Controller('shares')
export class SharesController {
  constructor(private sharesService: SharesService) {}
  @ApiOperation({ summary: 'Создать акцию' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Share })
  @Post()
  create(@Body() dto: CreateShareDto) {
    return this.sharesService.create(dto);
  }
  @ApiOperation({ summary: 'Получить все акции' })
  @ApiResponse({ status: HttpStatus.OK, type: Share, isArray: true })
  @Get()
  getAll() {
    return this.sharesService.getAll();
  }
  @ApiOperation({ summary: 'Получить одну акцию' })
  @ApiResponse({ status: HttpStatus.OK, type: Share })
  @Get('/:id')
  getOne(@Param('id') id: number) {
    if (!Number(id)) {
      throw new BadRequestException('Ошибка ввода');
    }
    return this.sharesService.getOne(id);
  }
  @ApiOperation({ summary: 'Удалить одну акцию' })
  @ApiResponse({ status: HttpStatus.OK, type: Share })
  @Delete('/:id')
  delete(@Param('id') id: number) {
    if (!Number(id)) {
      throw new BadRequestException('Ошибка ввода');
    }
    return this.sharesService.delete(id);
  }
}
