import { Injectable } from '@nestjs/common';
import { auth } from '../lib/auth';
import { fromNodeHeaders } from 'better-auth/node';
import { PrismaClient } from '../generated/prisma/client';
import { AcceptInvitationDto } from './dto/accept-invitation.dto';

const prisma = new PrismaClient();

@Injectable()
export class UserService {

  async listMyInvitations(req) {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers)
    });

    if (!session) return [];

    const myInvitations = await prisma.invitation.findMany({
      where: {
        email: session.user.email,
        status: 'pending'
      },
      include: {
        user: true,
        organization: true
      }
    });

    return myInvitations.map(invite => ({
      id: invite.id,
      email: invite.email,
      role: invite.role,
      status: invite.status,
      expiresAt: invite.expiresAt,

      // organization details
      organizationId: invite.organizationId,
      organizationName: invite.organization.name,

      // inviter details
      inviterId: invite.inviterId,
      inviterName: invite.user.name,
      inviterEmail: invite.user.email,
    }));
  }

  async acceptInvitation(dto: AcceptInvitationDto, cookieHeader?: string) {
      const response = await auth.api.acceptInvitation({
        body: {
          invitationId: dto.invitationId,
        },
        headers: cookieHeader ? { cookie: cookieHeader } : undefined,
      });

      return response;
    }
}
