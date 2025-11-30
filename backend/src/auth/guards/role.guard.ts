import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaClient } from '../../generated/prisma/client'
import { ROLE_KEY } from '../strategy/auth.decorator';

const prisma = new PrismaClient();

@Injectable()
export class OrgRoleGuard implements CanActivate {
  constructor( private reflector: Reflector ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user?.id) {
      throw new ForbiddenException('User not authenticated');
    }

    const organizationId =
      request.params.orgId ||
      user.activeOrganizationId;

    if (!organizationId) {
      throw new ForbiddenException('No organization selected');
    }

    const membership = await prisma.member.findFirst({
      where: {
        userId: user.id,
        organizationId,
      },
    });

    if (!membership) {
      throw new ForbiddenException('You are not a member of this organization');
    }

    const hasRole = requiredRoles.includes(membership.role);

    if (!hasRole) {
      throw new ForbiddenException('Insufficient role permissions');
    }

    return true;
  }
}
