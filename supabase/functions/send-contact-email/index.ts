import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;
  cargo?: string;
  empleados?: string;
  mensaje?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: ContactFormData = await req.json();

    // Email destinatario
    const DESTINATION_EMAIL = "comunicaciones@lexasconsultores.cl";

    // Email de confirmación al cliente
    const confirmationEmail = await resend.emails.send({
      from: "LexPro ERP <onboarding@resend.dev>",
      to: [formData.email],
      subject: "Gracias por contactarnos - LexPro ERP",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1a365d;">¡Gracias por tu interés en LexPro ERP!</h1>
          <p>Hola <strong>${formData.nombre}</strong>,</p>
          <p>Hemos recibido tu consulta y nos pondremos en contacto contigo a la brevedad.</p>
          
          <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Datos de tu consulta:</h3>
            <p><strong>Empresa:</strong> ${formData.empresa}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Teléfono:</strong> ${formData.telefono}</p>
            ${formData.cargo ? `<p><strong>Cargo:</strong> ${formData.cargo}</p>` : ''}
            ${formData.empleados ? `<p><strong>Empleados:</strong> ${formData.empleados}</p>` : ''}
            ${formData.mensaje ? `<p><strong>Mensaje:</strong> ${formData.mensaje}</p>` : ''}
          </div>
          
          <p>Nuestro equipo comercial se comunicará contigo en las próximas 24 horas.</p>
          <p>Saludos,<br><strong>Equipo LexPro ERP</strong></p>
        </div>
      `,
    });

    // Email notificación interna
    const notificationEmail = await resend.emails.send({
      from: "LexPro ERP <onboarding@resend.dev>",
      to: [DESTINATION_EMAIL],
      subject: `Nueva consulta de ${formData.empresa} - LexPro ERP`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #dc2626;">Nueva consulta recibida</h1>
          
          <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Datos del contacto:</h3>
            <p><strong>Nombre:</strong> ${formData.nombre}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Teléfono:</strong> ${formData.telefono}</p>
            <p><strong>Empresa:</strong> ${formData.empresa}</p>
            ${formData.cargo ? `<p><strong>Cargo:</strong> ${formData.cargo}</p>` : ''}
            ${formData.empleados ? `<p><strong>Empleados:</strong> ${formData.empleados}</p>` : ''}
            ${formData.mensaje ? `<p><strong>Mensaje:</strong> ${formData.mensaje}</p>` : ''}
          </div>
          
          <p><strong>Fecha:</strong> ${new Date().toLocaleString('es-ES')}</p>
        </div>
      `,
    });

    console.log("Emails sent successfully:", { confirmationEmail, notificationEmail });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Emails enviados correctamente" 
      }), 
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error sending emails:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);