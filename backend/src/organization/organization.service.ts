import { Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { CreateInvitationDto } from './dto/invitationEmail.dto';
import { auth } from '../lib/auth';

@Injectable()
export class OrganizationService {
  async create(dto: CreateOrganizationDto, cookieHeader?: string) {
  const response = await auth.api.createOrganization({
    body: {
      name: dto.name,
      slug: dto.slug,
      logo: dto.logo,
      metadata: dto.metadata,
      keepCurrentActiveOrganization: dto.keepCurrentActiveOrganization ?? false,
    },
    headers: cookieHeader ? { cookie: cookieHeader } : undefined,
  });


    return response;
  }

  async list(cookieHeader?: string) {
    const response = await auth.api.listOrganizations({
      headers: cookieHeader ? { cookie: cookieHeader } : {},
    });

    return response;
  }

  async getMembersList(organizationId: string, cookieHeader?: string) {
    const response = await auth.api.getFullOrganization({
      query: { organizationId },
      headers: cookieHeader ? { cookie: cookieHeader } : {},
    });

    return response?.members;
  }

  async remove(organizationId: string, cookieHeader?: string) {
    const response = await auth.api.deleteOrganization({
      body: { organizationId },
      headers: cookieHeader ? { cookie: cookieHeader } : {},
    });

    return response;
  }

  async sendInvitation(dto: CreateInvitationDto, cookieHeader?: string) {
    const response = await auth.api.createInvitation({
      body: {
        email: dto.email,
        role: dto.role,
        organizationId: dto.organizationId,
       // teamId: dto.teamId,
        resend: dto.resend ?? false,
      },
      headers: cookieHeader ? { cookie: cookieHeader } : undefined,
    });

    return response;
  }


}
