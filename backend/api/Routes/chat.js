const express = require("express");
const router = express.Router();
const axios = require("axios");
const { Activity } = require("../models/activity");

const processActivity = (activity) => {
  if (!activity) return {};

  const scores = activity.scores || {};

  let weakAreas = [];

  for (const date in scores) {
    for (const game in scores[date]) {
      const avg =
        scores[date][game].reduce((a, b) => a + b, 0) /
        scores[date][game].length;

      if (avg < 50) {
        weakAreas.push(game);
      }
    }
  }

  return {
    weakAreas,
    raw: scores,
  };
};

router.post("/", async (req, res) => {
  try {
    const { question, email } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    const userActivity = await Activity.findOne({ email });

    const user_context = processActivity(userActivity);

    const flaskResponse = await axios.post("https://brainwave-ml-backend.onrender.com/chat", {
      query: question,
      user_context,
    });

    return res.json(flaskResponse.data);

  } catch (err) {
    console.error("Chat error:", err.message);
    return res.status(500).json({ error: "Chat failed" });
  }
});

module.exports = router;