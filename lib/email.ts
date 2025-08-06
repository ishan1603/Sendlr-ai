import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(
  email: string,
  categories: string,
  article_count: number,
  newsletter_content: string
) {
  try {
    // Check if API key is available
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY environment variable is not set");
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

    console.log(`Attempting to send email to: ${email}`);
    console.log(`Email categories: ${categories}`);
    console.log(`Article count: ${article_count}`);

    const { data, error } = await resend.emails.send({
      from: "Sendlr/ai <onboarding@resend.dev>", // Resend's verified test domain
      to: [email],
      subject: `📰 Your ${categories} Newsletter - ${new Date().toLocaleDateString()}`,
      html: emailTemplate,
    });

    if (error) {
      console.error("Resend API returned error:", error);
      const errorMessage =
        error.message || error.name || JSON.stringify(error) || "Unknown error";
      throw new Error(`Resend API error: ${errorMessage}`);
    }

    console.log("Email sent successfully:", data);
    return data;
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
