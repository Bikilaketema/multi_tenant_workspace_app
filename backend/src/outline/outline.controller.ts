import { Controller, Post, Get, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { OutlineService } from './outline.service';
import { CreateOutlineDto } from './dto/create-outline.dto';
import { UpdateOutlineDto } from './dto/update-outline.dto';
import { OrgRoleGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/strategy/auth.decorator';

@UseGuards(OrgRoleGuard)
@Controller('organization/:orgId/outlines')
export class OutlineController {
  constructor(private readonly outlineService: OutlineService) {}

  @Post()
  @Roles('owner', 'admin')
  create(@Param('orgId') orgId: string, @Body() dto: CreateOutlineDto) {
    return this.outlineService.create(orgId, dto);
  }

  @Get()
  @Roles('owner', 'admin', 'member')
  findAll(@Param('orgId') orgId: string) {
    return this.outlineService.findAll(orgId);
  }

  @Roles('owner', 'admin', 'member')
  @Get(':outlineId')
  findOne(@Param('orgId') orgId: string, @Param('outlineId') outlineId: string) {
    return this.outlineService.findOne(orgId, outlineId);
  }

  @Roles('owner', 'admin')
  @Patch(':outlineId')
  update(@Param('orgId') orgId: string, @Param('outlineId') outlineId: string, @Body() dto: UpdateOutlineDto) {
    return this.outlineService.update(orgId, outlineId, dto);
  }

  @Roles('owner', 'admin')
  @Delete(':outlineId')
  remove(@Param('orgId') orgId: string, @Param('outlineId') outlineId: string) {
    return this.outlineService.remove(orgId, outlineId);
  }
}
