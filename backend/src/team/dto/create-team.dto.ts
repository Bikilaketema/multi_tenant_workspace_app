import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTeamDto {
  @ApiProperty({
    description: 'Name of the team',
    example: 'Frontend Developers',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'ID of the organization the team belongs to',
    example: 'org_123abc',
  })
  @IsString()
  @IsNotEmpty()
  organizationId: string;
}
