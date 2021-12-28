import { command } from "../mocks/commands/command";
import { userCommand } from "../mocks/commands/userCommand";
import { messageCommand } from "../mocks/commands/messageCommand";
import commandRaw from "../mocks/commands-raws/command_1.json";
import userCommandRaw from "../mocks/commands-raws/command_2.json";
import messageCommandRaw from "../mocks/commands-raws/command_3.json";
import MakeCommandService from "./make-command";

describe("Make Command Service", () => {
  describe("makeApplicationCommand function", () => {
    it("should make slash command", () => {
      expect(MakeCommandService.makeApplicationCommand(commandRaw)).toEqual(command);
    });
    it("should make user command", () => {
      expect(MakeCommandService.makeApplicationCommand(userCommandRaw)).toEqual(userCommand);
    });
    it("should make message command", () => {
      expect(MakeCommandService.makeApplicationCommand(messageCommandRaw)).toEqual(messageCommand);
    });
  })
})