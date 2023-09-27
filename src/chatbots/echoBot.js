import { CommonChatbot } from "./common";

export const EchoBot = class extends CommonChatbot {
  processMessage(message) {
    return this.buildTextMessage(`Echo: ${message}`);
  }
};
