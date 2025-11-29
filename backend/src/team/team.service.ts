import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { auth } from '../lib/auth';

@Injectable()
export class TeamService {
  create(createTeamDto: CreateTeamDto, cookieHeader?: string) {

    const response = auth.api.createTeam({
      body: {
        name: createTeamDto.name,
        organizationId: createTeamDto.organizationId,
      },
      headers: cookieHeader ? { cookie: cookieHeader } : undefined,
    });

    if (!response) {
      throw new Error("Failed to create team");
    }

    return response;
  }

  findAll(organizationId: string, cookieHeader: string) {

    const response = auth.api.listOrganizationTeams({
      query: {
        organizationId: organizationId,
      },

      headers: { cookie: cookieHeader },
    })

    return response;
  }

  async remove(teamId: string, organizationId: string, cookieHeader: string) {

    const response = await auth.api.removeTeam({
       body: {
        teamId: teamId,
        organizationId: organizationId
      },
      headers: { cookie: cookieHeader },
    });

    return response;
  }
}
