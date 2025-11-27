import { Module } from "@nestjs/common";
import { AuthModule } from "@thallesp/nestjs-better-auth";
import { auth } from "./lib/auth";

@Module({
  imports: [AuthModule.forRoot(auth)],
  controllers: [],
})
export class AppModule {}
