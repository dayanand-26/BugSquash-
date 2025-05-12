import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'npm:@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const { userId, title, content, link } = await req.json();

    // Create notification in database
    const { error: dbError } = await supabaseClient
      .from('notifications')
      .insert([
        { user_id: userId, title, content, link }
      ]);

    if (dbError) throw dbError;

    // Get user's email
    const { data: userData, error: userError } = await supabaseClient
      .from('profiles')
      .select('id, name')
      .eq('id', userId)
      .single();

    if (userError) throw userError;

    // Send email notification
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'notifications@bugsquash.com',
        to: userData.email,
        subject: title,
        html: `
          <h2>${title}</h2>
          <p>${content}</p>
          ${link ? `<p><a href="${link}">View in BugSquash</a></p>` : ''}
        `,
      }),
    });

    if (!emailResponse.ok) throw new Error('Failed to send email');

    return new Response(
      JSON.stringify({ message: 'Notification sent successfully' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});