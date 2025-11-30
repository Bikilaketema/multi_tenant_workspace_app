import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AcceptInvitationDto {
  @ApiProperty({
    description: 'ID of the invitation to accept',
    example: 'inv_123abc',
  })
  @IsString()
  invitationId: string;
}
