import { IsEnum, IsInt, IsString, IsOptional } from 'class-validator';
import { SectionType, Status, Reviewer } from '../../generated/prisma/enums';

export class CreateOutlineDto {
  @IsString()
  header: string;

  @IsEnum(SectionType)
  sectionType: SectionType;

  @IsEnum(Status)
  status: Status;

  @IsInt()
  target: number;

  @IsInt()
  limit: number;

  @IsEnum(Reviewer)
  reviewer: Reviewer;
}
