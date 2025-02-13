// const sentimentService = require("../services/sentimentService");

// exports.analyzeSentiment = async (req, res) => {
//   const text = req.body.text;
//   const sentiment = await sentimentService.analyzeSentiment(text);
//   res.json({ sentiment });
// };

const sentimentService = require("../services/sentimentService");

exports.analyzeSentiment = async (req, res) => {
  try {
    const text = req.body.text;
    const sentiment = await sentimentService.analyzeSentiment(text);
    res.json({ sentiment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
