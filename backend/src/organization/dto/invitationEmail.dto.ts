export class CreateInvitationDto {
  email: string;          // required
  role: 'member' | 'admin'; // required
  organizationId: string;  // required
  teamId?: string;         // optional
  resend?: boolean;        // optional
}
