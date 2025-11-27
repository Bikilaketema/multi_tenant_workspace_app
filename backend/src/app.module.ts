import { Module } from "@nestjs/common";
import { AuthModule } from "@thallesp/nestjs-better-auth";
import { auth } from "./lib/auth";
import { OrganizationModule } from './organization/organization.module';
import { OutlineModule } from './outline/outline.module';

@Module({
  imports: [AuthModule.forRoot(auth), OrganizationModule, OutlineModule],
  controllers: [],
})
export class AppModule {}
