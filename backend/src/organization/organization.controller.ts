import { Controller, Post, Body, Req, Param, Delete, Get } from '@nestjs/common';
import type { Request } from 'express';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { CreateInvitationDto } from './dto/invitationEmail.dto';
import { AcceptInvitationDto } from './dto/accept-invitation.dto';

@Controller('organization')
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

  @Get(':orgId/')
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

  @Post(':orgId/invite-member')
  async sendInvitationEmail(
    @Body() dto: CreateInvitationDto,
    @Req() req: Request
  ) {

    return this.organizationService.sendInvitation(dto, req.headers.cookie);
  }

  @Post(':orgId/accept-invitation')
  acceptInvitation(
    @Body() dto: AcceptInvitationDto,
    @Req() req: Request,
  ) {
    return this.organizationService.acceptInvitation(dto, req.headers.cookie);
  }
}
