import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const {
      pickup,
      destination,
      booking_date,
      booking_time,
      passengers,
      luggage,
      client_name,
      client_email,
      client_phone,
      notes,
    } = body;

    // Store in database
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { error: dbError } = await supabase.from("bookings").insert({
      pickup,
      destination,
      booking_date,
      booking_time,
      passengers: parseInt(passengers) || 1,
      luggage: parseInt(luggage) || 0,
      client_name,
      client_email,
      client_phone,
      notes,
    });

    if (dbError) {
      console.error("DB error:", dbError);
      return new Response(
        JSON.stringify({ error: "Failed to save booking" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Send email notification via Resend if API key is available
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (resendApiKey) {
      const emailHtml = `
        <h2>Nouvelle demande de réservation</h2>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Départ</td><td style="padding:8px;border:1px solid #ddd">${pickup}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Destination</td><td style="padding:8px;border:1px solid #ddd">${destination}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Date</td><td style="padding:8px;border:1px solid #ddd">${booking_date}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Heure</td><td style="padding:8px;border:1px solid #ddd">${booking_time}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Passagers</td><td style="padding:8px;border:1px solid #ddd">${passengers}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Bagages</td><td style="padding:8px;border:1px solid #ddd">${luggage}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Nom</td><td style="padding:8px;border:1px solid #ddd">${client_name}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${client_email || "Non renseigné"}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Téléphone</td><td style="padding:8px;border:1px solid #ddd">${client_phone || "Non renseigné"}</td></tr>
          ${notes ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Notes</td><td style="padding:8px;border:1px solid #ddd">${notes}</td></tr>` : ""}
        </table>
      `;

      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: "Les Chauffeurs de Mougins <booking@resend.dev>",
          to: ["kovasdriver@gmail.com"],
          subject: `Nouvelle réservation - ${client_name}`,
          html: emailHtml,
        }),
      });
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
