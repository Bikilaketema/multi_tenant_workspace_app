import { IsEnum, IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SectionType, Status, Reviewer } from '../../generated/prisma/enums';

export class CreateOutlineDto {
  @ApiProperty({
    description: 'Header or title of the outline section',
    example: 'Introduction to React',
  })
  @IsString()
  header: string;

  @ApiProperty({
    description: 'Type of the section',
    enum: SectionType,
    example: SectionType.TableOfContents,
  })
  @IsEnum(SectionType)
  sectionType: SectionType;

  @ApiProperty({
    description: 'Status of the outline section',
    enum: Status,
    example: Status.InProgress,
  })
  @IsEnum(Status)
  status: Status;

  @ApiProperty({
    description: 'Target number (e.g., words, pages, or items)',
    example: 500,
  })
  @IsInt()
  target: number;

  @ApiProperty({
    description: 'Limit number (e.g., max words, max items)',
    example: 1000,
  })
  @IsInt()
  limit: number;

  @ApiProperty({
    description: 'Reviewer assigned to this outline section',
    enum: Reviewer,
    example: Reviewer.Assim,
  })
  @IsEnum(Reviewer)
  reviewer: Reviewer;
}
