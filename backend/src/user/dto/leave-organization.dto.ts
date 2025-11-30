import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LeaveOrganizationDto {
  @ApiProperty({
    description: 'ID of the organization to leave',
    example: 'org_123abc',
  })
  @IsString()
  organizatioId: string;
}
