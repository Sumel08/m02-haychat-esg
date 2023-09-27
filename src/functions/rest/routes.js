import axios from "axios";
import { ChatbotFactory } from "../../chatbots/factory";

export const notificationHandler = async (req, res) => {
  const { conversationId, userId, message } = req.body;
  const chatbot = ChatbotFactory.getChatbot();
  try {
    const messageResponse = chatbot.processMessage(message.text.body);
    const response = { conversationId, userId, message: messageResponse };
    // return res.status(201).json(response);
    await axios.post(
      "https://us-central1-haystack-dot.cloudfunctions.net/chatWebhook",
      response,
    );
  } catch (error) {
    return res.status(400).json({ message: "something went wrong" });
  }
  return res.status(201).json({ message: "ok" });
};
