import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

serve(async (req) => {
  const { record } = await req.json() // Webhook එකෙන් එන ළමයාගේ විස්තර

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: 'SM Japanese Center <onboarding@resend.dev>',
      to: 'smjapaneselanguagecenteritunit@gmail.com', // මෙතනට සෙන්සෙගේ ඇත්තම email එක දාන්න
      subject: 'New Student Registration! 🎓',
      html: `
        <h1>New Enrollment Received</h1>
        <p><strong>Name:</strong> ${record.full_name}</p>
        <p><strong>Phone:</strong> ${record.phone_number}</p>
        <p><strong>Course:</strong> ${record.course}</p>
        <p><strong>Email:</strong> ${record.email || 'Not provided'}</p>
        <br>
        <p>සෙන්සෙ, කරුණාකර ඉක්මනින් මේ සිසුවා සම්බන්ධ කරගන්න.</p>
      `,
    }),
  })

  const data = await res.json()
  return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } })
})