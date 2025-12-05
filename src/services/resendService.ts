import { Resend } from "resend";
import { emailTemplate } from "../templates/contactEmail";

interface ContactEmail {
  name: string;
  email: string;
  message: string;
}

export const sendContactEmail = async ({ name, email, message }: ContactEmail) => {
  const API_KEY = process.env.RESEND_API_KEY;
  const SENDER_EMAIL = process.env.SENDER_EMAIL;
  const RECEIVER_EMAIL = process.env.RECEIVER_EMAIL;

  if (!API_KEY) {
    throw new Error("Missing required environment variable: RESEND_API_KEY");
  }

  if (!SENDER_EMAIL) {
    throw new Error("Missing required environment variable: SENDER_EMAIL");
  }

  if (!RECEIVER_EMAIL) {
    throw new Error("Missing required environment variable: RECEIVER_EMAIL");
  }

  const resend = new Resend(API_KEY);

  try {
    const response = await resend.emails.send({
      from: SENDER_EMAIL,
      to: RECEIVER_EMAIL,
      subject: `New message from ${name}`,
      html: emailTemplate({ name, email, message }),
    });
    console.log(`Email sent via Resend: SUCCESS`);
    return response;
  } catch (err: any) {
    const e = new Error(`Resend send error: ${err?.message || String(err)}`);
    // @ts-ignore attach original
    e.original = err;
    throw e;
  }
};
