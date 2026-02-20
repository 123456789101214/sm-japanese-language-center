const express = require('express');
const cors = require('cors');
const Groq = require('groq-sdk'); // අලුත් package එක
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// අර කොපි කරගත්ත Groq API Key එක මෙතනට දාන්න
const groq = new Groq({ 
  apiKey: process.env.GROQ_API_KEY // දැන් මේක ගන්නේ .env එකෙන්
});

const systemInstruction = `
  You are SM-Kun, the friendly AI assistant for SM Japanese Center, Sri Lanka.
  - Principal: Kanishka Sensei.
  - Courses: JLPT N5, N4, NAT Test.
  - Class Days: Weekend and Weekday batches.
  - Respond in a professional & friendly English.
  - Be helpful and encouraging to students.
  
  **STRICT RULES FOR RESPONDING:**
  1. Keep your answers very SHORT and CONCISE.
  2. Always when start a new chat, introduce yourself as "SM-Kun, the AI assistant of SM Japanese Language Center!" and give a warm welcome message.
  3. Do not write long paragraphs or unnecessary introductions.
  4. Maximum 2-3 sentences per response.
  5. Use bullet points only if there are more than 3 items.
  6. Answer directly to the point.
  7. Respond in a friendly English.
  
  Example:
  User: "How to contact sensei?"
  Response: "If you want to contact sensei, you can call 07X-XXXXXXX or visit our center to meet him! 😊"
  
`;

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemInstruction },
        { role: "user", content: message }
      ],
      model: "llama-3.3-70b-versatile", // 2026 දී තියෙන සුපිරිම free model එක
    });

    res.json({ reply: chatCompletion.choices[0].message.content });
  } catch (error) {
    console.error("Groq Error:", error);
    res.status(500).json({ error: "API eka poddak hira una machan!" });
  }
});

app.listen(5000, () => console.log("SM-Kun is now LIVE on Port 5000 via Groq!"));