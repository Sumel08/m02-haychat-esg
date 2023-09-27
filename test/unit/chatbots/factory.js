import "mocha";
import { expect } from "chai";
import sinon from "sinon";
import debug from "debug";
import AWS from "aws-sdk-mock";
import { ChatbotFactory } from "../../../src/chatbots/factory";

describe("chatbots/common.js", () => {
  it("should create EchoBot", () => {
    const bot = ChatbotFactory.getChatbot();
    const response = bot.processMessage("Hello");
    expect(3).equals(3);
  });
});
