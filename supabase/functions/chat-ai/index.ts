import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { message } = await req.json()
    const apiKey = Deno.env.get('GROQ_API_KEY')

    if (!apiKey) {
      throw new Error("GROQ_API_KEY is missing in Supabase Secrets!")
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", 
            content: `You are SM-Kun, the official AI assistant for SM Japanese Language Center, Sri Lanka. 
                      Here is the essential information you must use to answer questions:

                      - Sensei Name: [Kanishka Perera Sensei]
                      - Courses Offered: JLPT N5, N4, and N3 levels. Special focus on Japanese culture and conversation.
                      - Class Dates: [Weekend and Weekday batches]
                      - Contact Details: [Email: [Email Here], Address: [Ja-ela, Srilanka.].
                      - General Rules: Provide short, direct answers (under 3 sentences). Always be friendly and professional English.` },
          { role: "user", content: message }
        ],
      }),
    })

    const data = await response.json()
    
    // Groq එකෙන් error එකක් ආවොත් ඒක මෙතනදී අහුවෙනවා
    if (data.error) {
      console.error("Groq API Error:", data.error)
      throw new Error(data.error.message || "Groq API failed")
    }

    const reply = data.choices[0]?.message?.content || "No response"

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    })

  } catch (error) {
    console.error("Function Error:", error.message)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400, // <--- මේක නිසා තමයි ඔයාට 400 පේන්නේ
    })
  }
})