const moderate = require("../mocks/moderate.js");
import moderateData from "../mocks/moderate.json";
import { makeApplicationCommand } from "./make-command";

describe("Make Command Service", () => {
  describe("makeApplicationCommand function", () => {
    it("should make slash command", () => {
      expect(makeApplicationCommand(moderateData)).toEqual(moderate);
    });
  })
})