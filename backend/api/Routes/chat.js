const express = require("express");
const router = express.Router();
const axios = require("axios");

const HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models/Guna01/cognitive-bot-model";
router.post("/", async (req, res) => {
  try {
    const { question } = req.body;
    console.log("Received question:", question);

    if (!question) {
      return res.status(400).json({ error: "Question is required." });
    }

    const hfResponse = await axios.post(
      HUGGINGFACE_API_URL,
      {
        inputs: `### Instruction: ${question}\n### Response:`,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
        },
      }
    );

    const generatedText = hfResponse.data?.[0]?.generated_text || "Sorry, I couldn't understand.";

    const answer = generatedText.split("### Response:")[1]?.trim() || generatedText;

    return res.status(200).json({ answer });
  } catch (err) {
    console.error("Inference error:", err.response?.data || err.message);
    return res.status(500).json({ message: "An error occurred while processing your request." });
  }
});

module.exports = router;
