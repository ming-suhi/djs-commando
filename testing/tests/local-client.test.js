const LocalClient = require('../../src/local-client');
const CommandsManager = require('../../src/managers/commands-manager');
jest.mock('../../src/managers/commands-manager');

describe('LocalClient class', () => {

  const localClient = new LocalClient();
  const mockCommandsManager = CommandsManager.mock.instances[0];


  beforeEach(() => {
    CommandsManager.mockClear();
  });


  it('should call on CommandsManager match method', () => {
    localClient.handleInteraction();
    expect(mockCommandsManager.match).toHaveBeenCalledTimes(1);
  });

  
  it('should call on CommandsManager sync method', () => {
    localClient.syncCommands();
    expect(mockCommandsManager.sync).toHaveBeenCalledTimes(1);
  });
});