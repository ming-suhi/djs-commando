import { command } from "../mocks/commands/command";
import { commandRaw } from "../mocks/commands-raws/command";

describe('Slash Commands', () => {
  test('rawData property', () => {
    expect(command.rawData).toEqual(commandRaw);
  });
})