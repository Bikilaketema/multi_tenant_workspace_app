import { Controller, Get, Req } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/my-invitations')
  listMyInvitations(@Req() req: Request) {
    return this.userService.listMyInvitations(req)
  }
}
