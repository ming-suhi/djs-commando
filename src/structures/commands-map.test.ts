const moderate = require("../mocks/moderate.js");
import moderateData from "../mocks/moderate.json";
import CommandsMap from "./commands-map";

describe("CommandsMap", () => {

  const commands = new CommandsMap([[moderate.name, moderate]]);

  describe("getCommand function", () => {
    
    it("should return undefined", () => {
      const command = commands.getSlashCommand(["doesnotexist", "doesnotexist", "doesnotexist"]);
      expect(command).toEqual(undefined);
    });

    it("should get command", () => {
      const command = commands.getSlashCommand(["moderate"]);
      expect({...command}).toEqual(moderateData);
    });

    it("should get subcommand group", () => {
      const command = commands.getSlashCommand(["moderate", "member"]);
      expect({...command}).toEqual(moderateData.options?.find(command => command.name == "member"));
    });

    it("should get subcommand", () => {
      const command = commands.getSlashCommand(["moderate", "member", "timeout"]);
      expect({...command}).toEqual(moderateData.options?.find(option => option.name == "member")?.options?.find(option => option.name == "timeout"));
    });
  });
})