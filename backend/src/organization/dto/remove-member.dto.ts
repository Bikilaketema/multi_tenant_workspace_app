import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RemoveMemberDto {
  @ApiProperty({
    description: "Email of the member to remove from the organization",
    example: "user@example.com",
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: "ID of the organization from which the member will be removed",
    example: "org_123abc",
  })
  @IsString()
  organizationId: string;
}
