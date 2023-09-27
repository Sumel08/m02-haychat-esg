import { EchoBot } from "./echoBot";

export const ChatbotFactory = class {
  static getChatbot() {
    return new EchoBot();
  }
};
