const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generativeAIresponse = async (prompt) => { 
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-3.8-flash" });

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.log(error);
  }
};

const chatWithAI = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) return res.status(400).json({ message: "Prompt is required" });

    const aiText = await generativeAIresponse(prompt)

    res.status(200).json({message: aiText})
  } catch (error) {
    res.status(500).json({message: error.message})
  }
};

module.exports = chatWithAI