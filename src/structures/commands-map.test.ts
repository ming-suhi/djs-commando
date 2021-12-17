import * as MockCommand from "../mocks/commands/command";
import CommandsMap from "./commands-map";

describe("CommandsMap", () => {

  const commands = new CommandsMap([[MockCommand.command.name, MockCommand.command]]);

  test("rawData property", () => {
    expect(commands.rawData).toEqual([MockCommand.command.rawData]);
  });

  describe("getCommand function", () => {
    
    it("should return undefined", () => {
      const command = commands.getCommand(["doesnotexist", "doesnotexist", "doesnotexist"]);
      expect(command).toBe(undefined);
    });

    it("should get command", () => {
      const command = commands.getCommand(["command"]);
      expect(command).toBe(MockCommand.command);
    });

    it("should get subcommand", () => {
      const command = commands.getCommand(["command", "subcommand"]);
      expect(command).toBe(MockCommand.subcommand);
    });

    it("should get subcommandgroup", () => {
      const command = commands.getCommand(["command", "subcommandgroup"]);
      expect(command).toBe(MockCommand.subcommandgroup);
    });

    it("should get subcommand inside subcommandgroup", () => {
      const command = commands.getCommand(["command", "subcommandgroup", "subcommand"]);
      expect(command).toBe(MockCommand.subcommand);
    });
  });
})