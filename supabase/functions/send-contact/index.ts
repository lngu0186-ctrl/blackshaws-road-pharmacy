import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ContactPayload {
  name: string;
  phone?: string;
  email: string;
  message: string;
  timestamp?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, phone, email, message, timestamp } =
      (await req.json()) as ContactPayload;

    // Validate required fields
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: name, email, and message are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const smtpPass = Deno.env.get("SMTP2GO_PASSWORD");
    const adminEmail = Deno.env.get("ADMIN_EMAIL") || "info@blackshawsroadpharmacy.com.au";

    if (!smtpPass) {
      return new Response(
        JSON.stringify({
          error: "SMTP configuration missing",
          debug: { name, email, timestamp },
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const emailSubject = `Contact Form Enquiry from ${name}`;
    const emailBody = `
New Contact Form Enquiry — Blackshaws Road Pharmacy
${"=".repeat(60)}

Name: ${name}
Phone: ${phone || "Not provided"}
Email: ${email}
Time: ${timestamp || new Date().toISOString()}

Message:
${message}

${"=".repeat(60)}
This enquiry was submitted via the website contact form.
    `.trim();

    // Send email via SMTP2GO
    const response = await fetch("https://api.smtp2go.com/v3/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Smtp2go-Api-Key": smtpPass,
      },
      body: JSON.stringify({
        sender: "noreply@blackshawsroadpharmacy.com.au",
        to: [adminEmail],
        subject: emailSubject,
        text_body: emailBody,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`SMTP2GO API error: ${response.status} ${errorData}`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Your message has been sent successfully. We'll get back to you within 1 business day.",
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to send message. Please try again or call us directly.",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
