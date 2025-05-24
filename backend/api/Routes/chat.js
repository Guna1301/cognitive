const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req, res) => {
  try {
    const { question } = req.body;
    console.log("Received question:", question);
    if (!question) {
      return res.status(400).json({ error: "Question is required." });
    }

    
    const response = await axios.post("http://localhost:8000/infer", {
      question: question,
    });

    const answer = response.data.answer || "Sorry, I couldn't understand.";

    return res.status(200).json({ answer });
  } catch (err) {
    return res.status(500).json({ message: "An error occurred while processing your request." });
  }
});

module.exports = router;
