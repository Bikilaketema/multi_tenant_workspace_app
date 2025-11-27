import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client';
import { CreateOutlineDto } from './dto/create-outline.dto';
import { UpdateOutlineDto } from './dto/update-outline.dto';

const prisma = new PrismaClient();

@Injectable()
export class OutlineService {
  async create(orgId: string, dto: CreateOutlineDto) {
    return await prisma.outline.create({
      data: {
        header: dto.header,
        sectionType: dto.sectionType,
        status: dto.status,
        target: dto.target,
        limit: dto.limit,
        reviewer: dto.reviewer,
        organization: { connect: { id: orgId } },
      },
    });
  }

  async findAll(orgId: string) {
    return await prisma.outline.findMany({
      where: { organizationId: orgId },
    });
  }

  async findOne(orgId: string, outlineId: string) {

    const outline = await prisma.outline.findFirst({
      where: { id: outlineId, organizationId: orgId },
    });

    if (!outline) {
      throw new NotFoundException('Outline not found or does not belong to the organization');
    }

    return await prisma.outline.findFirst({
      where: { id: outlineId, organizationId: orgId },
    });
  }

  async update(orgId: string, outlineId: string, dto: UpdateOutlineDto) {

    const outline = await prisma.outline.findFirst({
      where: { id: outlineId, organizationId: orgId },
    });

    if (!outline) {
      throw new NotFoundException('Outline not found or does not belong to the organization');
    }

    return await prisma.outline.update({
      where: { id: outlineId },
      data: {
        ...dto,
        sectionType: dto.sectionType ? { set: dto.sectionType } : undefined,
        status: dto.status ? { set: dto.status } : undefined,
        reviewer: dto.reviewer ? { set: dto.reviewer } : undefined,
      },
    });
  }

  async remove(orgId: string, outlineId: string) {

    const outline = await prisma.outline.findFirst({
      where: { id: outlineId, organizationId: orgId },
    });

    if (!outline) {
      throw new NotFoundException('Outline not found or does not belong to the organization');
    }

    return await prisma.outline.delete({
      where: { id: outlineId },
    });
  }
}
