const LocalClient = require('../../src/local-client');
const CommandsManager = require('../../src/managers/commands-manager');
jest.mock('../../src/managers/commands-manager');


beforeEach(() => {
  CommandsManager.mockClear();
});

it('Class methods check', async() => {
  expect(CommandsManager).not.toHaveBeenCalled();

  const localClient = new LocalClient();
  expect(CommandsManager).toHaveBeenCalledTimes(1);

  localClient.handleInteraction();
  localClient.syncCommands();
  const mockCommandsManager = CommandsManager.mock.instances[0];
  expect(mockCommandsManager.match).toHaveBeenCalledTimes(1);
  expect(mockCommandsManager.sync).toHaveBeenCalledTimes(1);
});