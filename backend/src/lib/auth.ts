import { betterAuth } from "better-auth";
import { organization } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { sendOrganizationInvitation } from "./email";
import { frontend_url, trustedOrigins } from "config";

export const auth = betterAuth({
  url: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  
  emailAndPassword: { enabled: true },
  trustedOrigins,
  plugins: [organization({
      teams: { enabled: true },
      async sendInvitationEmail(data) {
        const inviteLink = `${frontend_url}/invite?invitationId=${data.id}`;
        sendOrganizationInvitation({
          email: data.email,
          invitedByUsername: data.inviter.user.name,
          invitedByEmail: data.inviter.user.email,
          teamName: data.organization.name,
          inviteLink,
        });
      },
    })],
});