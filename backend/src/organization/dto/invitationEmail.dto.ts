import { IsString, IsOptional, IsBoolean, IsEnum } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateInvitationDto {
  @ApiProperty({
    description: "Email of the user to invite",
    example: "user@example.com",
  })
  @IsString()
  email: string; // required

  @ApiProperty({
    description: "Role assigned to the invited user",
    example: "member",
    enum: ["member", "admin"],
  })
  @IsEnum(['member', 'admin'])
  role: 'member' | 'admin'; // required

  @ApiProperty({
    description: "ID of the organization where the user is invited",
    example: "org_123abc",
  })
  @IsString()
  organizationId: string; // required

  @ApiPropertyOptional({
    description: "ID of the team to which the user is invited (optional)",
    example: "team_456xyz",
  })
  @IsOptional()
  @IsString()
  teamId?: string; // optional

  @ApiPropertyOptional({
    description: "Whether to resend the invitation if it already exists",
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  resend?: boolean; // optional
}
