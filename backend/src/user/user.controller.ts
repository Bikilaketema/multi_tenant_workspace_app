import { Controller, Get, Req, Post, Body } from '@nestjs/common';
import type { Request } from 'express';
import { UserService } from './user.service';
import { AcceptInvitationDto } from './dto/accept-invitation.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/my-invitations')
  listMyInvitations(@Req() req: Request) {
    return this.userService.listMyInvitations(req)
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
}
