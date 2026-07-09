'use server';

import { Resend } from 'resend';

interface EmailData {
  name: string;
  email: string;
  message: string;
  aiSummary?: string;
}

export async function sendContactEmail(data: EmailData) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn("RESEND_API_KEY is not set. Email notification skipped.");
    return { success: false, error: "Email configuration missing" };
  }

  try {
    const resend = new Resend(apiKey);
    const { name, email, message, aiSummary } = data;
    
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'mohithhariharan28@gmail.com',
      subject: `New Portfolio Message from ${name}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #8B5CF6;">New Transmission Received</h2>
          <p><strong>Sender:</strong> ${name} (${email})</p>
          <div style="background: #f4f4f4; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
          </div>
          ${aiSummary ? `
            <div style="border-left: 4px solid #22D3EE; padding-left: 15px; margin-top: 20px;">
              <p style="color: #22D3EE; font-weight: bold; font-size: 12px; text-transform: uppercase;">AI Synthesis</p>
              <p style="font-style: italic;">"${aiSummary}"</p>
            </div>
          ` : ''}
          <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />
          <p style="font-size: 10px; color: #999;">Automated notification from Mohith's Portfolio</p>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error: "Transmission error" };
  }
}
