import nodemailer from "nodemailer";

// Create transporter using Gmail
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER, // Your Gmail address
      pass: process.env.GMAIL_APP_PASSWORD, // Your Gmail App Password (not regular password)
    },
  });
};

export async function sendEmailNodemailer(
  email: string,
  categories: string,
  article_count: number,
  newsletter_content: string
) {
  try {
    // Check if Gmail credentials are available
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      throw new Error(
        "Gmail credentials not set. Please set GMAIL_USER and GMAIL_APP_PASSWORD environment variables"
      );
    }

    const emailTemplate = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Sendlr/ai Newsletter</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
    </style>
  </head>
  <body style="margin: 0; padding: 30px; background: #f5f5f5; font-family: 'Press Start 2P', monospace; color: #333333;">

    <div style="max-width: 700px; margin: auto; background: #ffffff; border: 3px solid #333333; box-shadow: 8px 8px 0px #cccccc;">
      
      <!-- Header -->
      <div style="background: #333333; color: #ffffff; padding: 25px; text-align: center;">
        <div style="font-size: 20px; margin-bottom: 10px;">
          📰 SENDLR/AI
        </div>
        <div style="font-size: 12px;">
          YOUR DAILY TECH DIGEST
        </div>
      </div>

      <div style="background: #eeeeee; padding: 15px 25px; border-bottom: 2px solid #333333;">
        <div style="font-size: 11px; text-align: center;">
          📅 ${new Date().toLocaleDateString()} • 📂 ${categories.toUpperCase()} • 📊 ${article_count} STORIES
        </div>
      </div>

      <div style="padding: 30px 25px; font-size: 12px; line-height: 1.8; color: #444444;">
        ${newsletter_content}
      </div>

      <!-- Footer -->
      <div style="background: #333333; color: #ffffff; padding: 20px; text-align: center; font-size: 10px;">
        <div style="margin-bottom: 5px;">
          ⚡ POWERED BY SENDLR/AI ⚡
        </div>
        <div style="font-size: 8px; color: #cccccc;">
          Unsubscribe anytime in your settings
        </div>
      </div>

    </div>

  </body>
</html>`;

    console.log(`Sending email to: ${email}`);
    console.log(`Email categories: ${categories}`);
    console.log(`Article count: ${article_count}`);

    const transporter = createTransporter();

    const mailOptions = {
      from: `"Sendlr/ai" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `📰 Your ${categories} Newsletter - ${new Date().toLocaleDateString()}`,
      html: emailTemplate,
    };

    const result = await transporter.sendMail(mailOptions);

    console.log("Email sent successfully:", result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error("Failed to send email:", error);
    console.error("Error details:", {
      name: error instanceof Error ? error.name : "Unknown",
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : "No stack trace",
    });
    throw error;
  }
}
