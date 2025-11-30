import { Controller, Get, Req, Post, Body, UnauthorizedException, Param } from '@nestjs/common';
import type { Request } from 'express';
import { UserService } from './user.service';
import { AcceptInvitationDto } from './dto/accept-invitation.dto';
import { LeaveOrganizationDto } from './dto/leave-organization.dto';
import { ApiSecurity } from '@nestjs/swagger';

@ApiSecurity('session-cookie')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/my-invitations')
  listMyInvitations(@Req() req: Request) {
    return this.userService.listMyInvitations(req)
  }

  @Get(':invitationId/invitation')
  getSingleInvitation(
    @Req() req: Request,
    @Param('invitationId') invitationId: string
  ) {
    const cookie = req.headers.cookie
    if (!cookie) throw new UnauthorizedException('No session cookie found')

    return this.userService.getInvitation(invitationId, cookie)
  }


  @Post(':orgId/accept-invitation')
  acceptInvitation(
    @Body() dto: AcceptInvitationDto,
    @Req() req: Request,
  ) {
    return this.userService.acceptInvitation(dto, req.headers.cookie);
  }

  @Post(':orgId/reject-invitation')
  rejectInvitation(
    @Body() dto: AcceptInvitationDto,
    @Req() req: Request,
  ) {
    return this.userService.rejectInvitation(dto, req.headers.cookie);
  }

  @Post(':orgId/leave-organization')
  leaveOrganization(
    @Body() dto: LeaveOrganizationDto,
    @Req() req: Request,
  ) {

    if (!req.headers.cookie) {
      throw new UnauthorizedException('No cookie found');
    }

    return this.userService.leaveOrganization(dto, req.headers.cookie);
  }
}
