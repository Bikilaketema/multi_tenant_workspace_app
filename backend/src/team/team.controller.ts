import { Controller, Get, Post, Body, Query, Param, Delete, Req, UnauthorizedException } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import type { Request } from 'express';
import { organization } from 'better-auth/plugins';

@Controller('team/:orgId')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post('create-team')
  create(@Body() createTeamDto: CreateTeamDto, @Req() req: Request) {
    return this.teamService.create(createTeamDto, req.headers.cookie);
  }

  @Get('list-teams')
  findAll(@Req() req: Request, @Param('orgId') organizationId: string) {

    if (!req.headers.cookie) {
      throw new UnauthorizedException('No cookie found');
    }

    return this.teamService.findAll(organizationId, req.headers.cookie);
  }

  @Delete(':teamId/delete-team')
  async remove(
    @Param('teamId') teamId: string,
    @Query('orgId') organizationId: string,
    @Req() req: Request,
  ) {
    if (!req.headers.cookie) {
      throw new UnauthorizedException('No session cookie found');
    }

    return this.teamService.remove(teamId, organizationId, req.headers.cookie);
  }
}
