import { userCommand } from "../mocks/commands/userCommand";
import { messageCommand } from "../mocks/commands/messageCommand";
import messageCommandRaw from "../mocks/commands-raws/command_2.json";
import userCommandRaw from "../mocks/commands-raws/command_3.json";

describe("Context Menu Commands", () => {

  describe('Message Command', () => {
    test("rawData property", () => {
      expect(messageCommand.rawData).toEqual(messageCommandRaw);
    });
  });

  describe('User Command', () => {
    test("rawData property", () => {
      expect(userCommand.rawData).toEqual(userCommandRaw);
    });
  });
});