import * as MockCommand from "../mocks/commands/command";
import { CommandsMap } from "./commands-map";

describe("CommandsMap", () => {

  const commands = new CommandsMap([[MockCommand.command.name, MockCommand.command]]);

  describe("getCommand function", () => {
    
    it("should get top command", () => {
      const command = commands.getCommand(["top"]);
      expect(command).toBe(MockCommand.command);
    });

    it("should get subcommand", () => {
      const command = commands.getCommand(["top", "subcommand"]);
      expect(command).toBe(MockCommand.subcommand);
    });

    it("should get subcommandgroup", () => {
      const command = commands.getCommand(["top", "group"]);
      expect(command).toBe(MockCommand.group);
    });

    it("should get subcommand inside subcommandgroup", () => {
      const command = commands.getCommand(["top", "group", "subcommandinsidegroup"]);
      expect(command).toBe(MockCommand.subcommandInsideGroup);
    });
  });
})