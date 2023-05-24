import { Role } from '@app/models';
import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesService } from './roles.service';

@ApiTags('Роли')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}
  @ApiOperation({ summary: 'Получить список всех ролей' })
  @ApiResponse({ status: HttpStatus.OK, type: Role, isArray: true })
  @Get()
  getAll() {
    return this.rolesService.getAllRoles();
  }
  @ApiOperation({ summary: 'Получить роль по полю value' })
  @ApiResponse({ status: HttpStatus.OK, type: Role })
  @Get('/:value')
  getByValue(@Param('value') value: string) {
    return this.rolesService.getRoleByValue(value);
  }
}
