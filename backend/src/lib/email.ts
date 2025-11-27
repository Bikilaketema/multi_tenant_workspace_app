import nodemailer from 'nodemailer';

interface InvitationData {
  email: string;
  invitedByUsername: string;
  invitedByEmail: string;
  teamName: string;
  inviteLink: string;
}

export async function sendOrganizationInvitation(data: InvitationData) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_ADDRESS, 
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"${data.invitedByUsername}" <${data.invitedByEmail}>`,
    to: data.email,
    subject: `You're invited to join ${data.teamName}!`,
    html: `
      <p>Hello,</p>
      <p>${data.invitedByUsername} invited you to join <b>${data.teamName}</b>.</p>
      <p>Click <a href="${data.inviteLink}">here</a> to accept the invitation.</p>
      <p>If you didn't expect this, you can ignore this email.</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Invitation email sent:', info.messageId);
    console.log("invitation-id", data.inviteLink)
  } catch (err) {
    console.error('Error sending invitation email:', err);
  }
}
