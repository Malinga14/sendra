export const emailTemplate = ({ name, email, message }: { name: string; email: string; message: string }) => `
<div style="font-family: Arial; padding: 20px;">
  <h2>New Contact Form Submission</h2>
  <p><strong>Name:</strong> ${name}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Message:</strong></p>
  <p>${message}</p>
</div>
`;
