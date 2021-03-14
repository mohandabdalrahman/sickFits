import { createTransport, getTestMessageUrl } from 'nodemailer';

const transporter = createTransport({
  // @ts-ignore
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function makeNiceEmail(text: string) {
  return /*html*/ `
  <div style="
  border:1px solid black;
  padding:20px;
  font-family:sans-serif;
  line-height:2;
  font-size:20px
  ">
  <h2>Hello There!</h2>
  <p>${text}</p>
  <p>😘:Mohand</p>
  </div>
  `;
}

export interface mailResponse {
  accepted?: string[] | null;
  rejected?: null[] | null;
  envelopeTime: number;
  messageTime: number;
  messageSize: number;
  response: string;
  envelope: Envelope;
  messageId: string;
}
export interface Envelope {
  from: string;
  to?: string[] | null;
}

export async function sendPasswordResetEmail(
  resetToken: string,
  to: string
): Promise<void> {
  const info = (await transporter.sendMail({
    to,
    from: 'test@example.com',
    subject: 'password reset token',
    html: makeNiceEmail(/*html*/ `
    Your Password Reset Token is Here!
    <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">Click Here to reset your password</a>
    `),
  })) as mailResponse;

  if (process.env.MAIL_USER.includes('ethereal.email')) {
    // @ts-ignore
    console.log(`💌 Message sent preview it at ${getTestMessageUrl(info)}`);
  }
}
