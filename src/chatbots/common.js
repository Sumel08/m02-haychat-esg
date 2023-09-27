export const CommonChatbot = class {
  processMessage(message) {
    throw new Error("Imlement this method");
  }

  #buildBaseMessage() {
    return {
      author: "echo@haystack.com",
      id: "bdb86635-7774-4bb8-a64b-c393ea743ce2",
      read: 1,
      readBy: "",
      sendingMessage: false,
      sentBy: process.env.service,
      source: "haystack-dot",
      text: {
        body: "Echo: ahora quiero el echo de tu voz",
      },
      timestamp: new Date().getTime(),
      type: "text",
    };
  }

  buildTextMessage(text) {
    const message = this.#buildBaseMessage();
    message.type = "text";
    message.text = {
      body: text,
    };
    return message;
  }
};
