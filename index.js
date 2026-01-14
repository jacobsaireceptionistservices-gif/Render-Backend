const express = requre("express");
const axious = require("axios");

constapp =(express.json());

app.use(express.json());
app.use(express.urlencoded({ extened: true }));

app.get("/", (req,res) => {
  res.send("Auto shop Ai Receptionist is running");
});

app.get("health", (req,res) => {
  res.status(200).json({ status: "ok" });
});

app.post("/make-webhook", (req, res) => {
  console.log("New auto shop lead:",req.body);

  res.status(200).json({
    received: true,
    business: "auto-shop",
  });
});

app.post("/twillo?voice", (req, res) => {
  console.log("Incoming call from:", req.body.from);

  const twiml = `
<?xml version="1.0" encoding="UTF-8"?>
<response>
  <say voice="alice">
   Thank you fot calling Precision Auto Service.
   How can we help you today?
  </say>
</Response>
`;

  res,type("text/hxml");
  res.send(twiml);
});

app.post"/elevenlabs/speak", async (req res) => {
  try {
    const { text } =req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${process.env.ELEVENLABS_VOICE_ID}`,
      {
        text,
        model_id: "eleven_monolingual_v1",
      },
      {
        headers: {
          "Xi-api-key": process.env.ELEVENLABS_API_KEY,
          "Content-Type": "application/json",
          Accept: "audio/mpeg",
        },
        responseType: "arraybuffer",
      }
    );
    
    res.set("Content-Type", "audio/mpeg");
    res.send(response.data);
  } catch (error) {
    console.error("ElevenLabs error:", error.message);
    res.status(500).json({ error: "TTS failed" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
