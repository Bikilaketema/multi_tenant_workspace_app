import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module'; 
import { PrismaService } from '../prisma/prisma.service'; 
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BETTER_AUTH_INSTANCE } from './auth.constants';
import { betterAuth } from "better-auth";
import { organization } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { AuthController } from './auth.controller';

@Module({
  imports: [PrismaModule, ConfigModule], 
  controllers: [AuthController],
  providers: [
    {
      provide: BETTER_AUTH_INSTANCE,
      useFactory: (prismaService: PrismaService, configService: ConfigService) => {
        return betterAuth({
          secret: configService.get('BETTER_AUTH_SECRET'),
          emailAndPassword: { enabled: true },

          database: prismaAdapter(prismaService, { 
            provider: "postgresql",
          }),
          plugins: [
            organization({
              customRoles: [
                { role: 'Owner', label: 'Owner' }, 
                { role: 'Member', label: 'Member' },
              ],
              organizationHooks: {
                afterCreateOrganization: async ({ member }) => { 
                  await member.setRole('Owner'); 
                },
              }
            }),
          ],
        });
      },
      inject: [PrismaService, ConfigService],
    },
  ],
  exports: [BETTER_AUTH_INSTANCE], 
})
export class AuthModule {}