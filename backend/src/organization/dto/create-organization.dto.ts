import { IsString, IsOptional, IsBoolean, IsUrl, IsObject } from "class-validator";

export class CreateOrganizationDto {
  @IsString()
  name: string; // required

  @IsString()
  slug: string; // required

  @IsUrl()
  @IsOptional()
  logo?: string;

  @IsObject()
  @IsOptional()
  metadata?: Record<string, any>;

  @IsBoolean()
  @IsOptional()
  keepCurrentActiveOrganization?: boolean = false;
}
