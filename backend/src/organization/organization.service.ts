import { Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { CreateInvitationDto } from './dto/invitationEmail.dto';
import { AcceptInvitationDto } from '../user/dto/accept-invitation.dto';
import { PrismaClient } from '../generated/prisma/client';
import { auth } from '../lib/auth';
import { fromNodeHeaders } from 'better-auth/node';

const prisma = new PrismaClient();

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

  async list(req) {

    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers)
    });

    if (!session?.user?.id) {
    throw new Error("User not authenticated");
    }

  const userId = session.user.id;

    const organizations = await prisma.organization.findMany({
      where: {
        members: {
          some: {
            userId: userId,
          },
        },
      },
      include: {
        members: {
          where: {
            userId: userId,
          },
          select: {
            role: true,
          },
        },
      },
    });

    return organizations.map((org) => ({
      id: org.id,
      name: org.name,
      slug: org.slug,
      logo: org.logo,
      role: org.members[0]?.role || "member",
      totalMembers: org.members.length
    }));
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
