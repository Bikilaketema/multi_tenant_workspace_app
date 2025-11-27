import { Controller, Post, Body, Req } from '@nestjs/common';
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
}
