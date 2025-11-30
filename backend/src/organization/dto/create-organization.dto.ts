import { IsString, IsOptional, IsBoolean, IsUrl, IsObject } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateOrganizationDto {
  @ApiProperty({
    description: "Name of the organization",
    example: "Acme Corp",
  })
  @IsString()
  name: string; // required

  @ApiProperty({
    description: "Slug used in URLs for the organization",
    example: "acme-corp",
  })
  @IsString()
  slug: string; // required

  @ApiPropertyOptional({
    description: "URL of the organization's logo",
    example: "https://example.com/logo.png",
  })
  @IsUrl()
  @IsOptional()
  logo?: string;

  @ApiPropertyOptional({
    description: "Additional metadata for the organization",
    example: { industry: "Software", size: 50 },
    type: Object,
  })
  @IsObject()
  @IsOptional()
  metadata?: Record<string, any>;

  @ApiPropertyOptional({
    description: "Whether to keep the current active organization after creating this one",
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  keepCurrentActiveOrganization?: boolean = false;
}
