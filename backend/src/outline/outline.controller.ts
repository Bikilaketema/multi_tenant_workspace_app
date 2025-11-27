import { Controller, Post, Get, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { OutlineService } from './outline.service';
import { CreateOutlineDto } from './dto/create-outline.dto';
import { UpdateOutlineDto } from './dto/update-outline.dto';

@Controller('organization/:orgId/outlines')
export class OutlineController {
  constructor(private readonly outlineService: OutlineService) {}

  @Post()
  create(@Param('orgId') orgId: string, @Body() dto: CreateOutlineDto) {
    return this.outlineService.create(orgId, dto);
  }

  @Get()
  findAll(@Param('orgId') orgId: string) {
    return this.outlineService.findAll(orgId);
  }

  @Get(':outlineId')
  findOne(@Param('orgId') orgId: string, @Param('outlineId') outlineId: string) {
    return this.outlineService.findOne(orgId, outlineId);
  }

  @Patch(':outlineId')
  update(@Param('orgId') orgId: string, @Param('outlineId') outlineId: string, @Body() dto: UpdateOutlineDto) {
    return this.outlineService.update(orgId, outlineId, dto);
  }

  @Delete(':outlineId')
  remove(@Param('orgId') orgId: string, @Param('outlineId') outlineId: string) {
    return this.outlineService.remove(orgId, outlineId);
  }
}
