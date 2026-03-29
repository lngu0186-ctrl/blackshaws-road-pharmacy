import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface FilePayload {
  name: string;
  type: string;
  data: string; // base64
}

interface PrescriptionPayload {
  fullName: string;
  dob: string;
  phone: string;
  notes: string;
  files: FilePayload[];
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fullName, dob, phone, notes, files } =
      (await req.json()) as PrescriptionPayload;

    // Validate
    if (!fullName || !dob || !phone || !files?.length) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const smtpPass = Deno.env.get("SMTP2GO_PASSWORD");
    const smtpUser = Deno.env.get("SMTP2GO_USERNAME");

    if (!smtpUser || !smtpPass) {
      console.error("SMTP credentials not configured");
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const emailBody = `NEW PRESCRIPTION – Blackshaws Road Pharmacy

PATIENT:
• Name: ${fullName}
• DOB: ${dob}
• Phone: ${phone}
• Notes: ${notes || "None"}

Review attached prescription image/PDF.
⚠️ Paper scripts require original at pickup.

310A Blackshaws Road, Altona North VIC 3025
03 9391 3257
0406 692 267`;

    const attachments = files.map((f) => ({
      filename: f.name,
      fileblob: f.data,
      mimetype: f.type,
    }));

    // Use SMTP2GO REST API
    const apiResponse = await fetch("https://api.smtp2go.com/v3/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: smtpPass,
        to: ["online@blackshawsroadpharmacy.com.au"],
        sender: "scripts@blackshawsroadpharmacy.com.au",
        subject: `URGENT: New Prescription Upload – ${fullName}`,
        text_body: emailBody,
        attachments,
      }),
    });

    const result = await apiResponse.json();

    if (!apiResponse.ok) {
      console.error("SMTP2GO error:", JSON.stringify(result));
      return new Response(
        JSON.stringify({ error: "Failed to send email" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
