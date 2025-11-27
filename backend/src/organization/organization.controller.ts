import { Controller, Post, Body, Req, Param, Delete } from '@nestjs/common';
import type { Request } from 'express';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';

@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  create(@Body() dto: CreateOrganizationDto, @Req() req: Request) {
    // Pass cookies/session headers to service
    return this.organizationService.create(dto, req.headers.cookie);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Req() req: Request) {
    return this.organizationService.remove(id, req.headers.cookie);
  }
}
