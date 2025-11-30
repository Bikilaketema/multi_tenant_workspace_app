import { Controller, Post, Body, Req, Param, Delete, Get, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { CreateInvitationDto } from './dto/invitationEmail.dto';
import { RemoveMemberDto } from './dto/remove-member.dto';
import { OrgRoleGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/strategy/auth.decorator';
import { ApiSecurity } from '@nestjs/swagger';

@UseGuards(OrgRoleGuard)
@Controller('organization')
@ApiSecurity('session-cookie')
@Controller('organizations')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  create(@Body() dto: CreateOrganizationDto, @Req() req: Request) {
    // Pass cookies/session headers to service
    return this.organizationService.create(dto, req.headers.cookie);
  }

  @Get()
  list(@Req() req: Request) {
    return this.organizationService.list(req);
  }

  @Get(':orgId/members')
  getMembers(
    @Param('orgId') orgId: string,
    @Req() req: Request,
  ) {
    return this.organizationService.getMembersList(orgId, req.headers.cookie);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Req() req: Request) {
    return this.organizationService.remove(id, req.headers.cookie);
  }

  @Roles('owner')
  @Post(':orgId/invite-member')
  async sendInvitationEmail(
    @Body() dto: CreateInvitationDto,
    @Req() req: Request
  ) {

    return this.organizationService.sendInvitation(dto, req.headers.cookie);
  }

  @Roles('owner')
  @Delete(':orgId/remove-member')
  async removeMember(
    @Body() dto: RemoveMemberDto,
    @Req() req: Request
  ) {
    return this.organizationService.removeMemberFromOrg(dto, req.headers.cookie);
  }
}
