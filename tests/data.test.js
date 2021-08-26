const { StringField, Command, Subcommand, OptionsManager } = require('../dist/index');

// tests
describe('data', () => {

  var fieldObject = {
    name: "testField", 
    description: "a test field", 
    required: false, 
    choices: undefined, 
    type: 3
  }

  var commandObject = {
    name: "command",
    description: "a command",
    options: [],
    type: 1
  }

  var subcommandObject = {
    name: "subcommand",
    description: "a subcommand",
    options: [],
    type: 1
  }


  test('for fields', () => {
    const field = new StringField(fieldObject.name, fieldObject.description);
    expect(field.data).toEqual(fieldObject);
  });


  test('for basic command', () => {
    const command = new class extends Command {
      name = commandObject.name;
      description = commandObject.description;
    }
    expect(command.data).toEqual(commandObject);
  });


  test('for command with field', () => {
    commandObject.options = [fieldObject]
    const field = new StringField(fieldObject.name, fieldObject.description);
    const command = new class extends Command {
      name = commandObject.name;
      description = commandObject.description;
      options = new OptionsManager([field]);
    }
    expect(command.data).toEqual(commandObject);
  })


  test('command with subcommand', () => {
    commandObject.options = [subcommandObject]
    const subcommand = new class extends Subcommand {
      name = subcommandObject.name;
      description = subcommandObject.description;
    }
    const command = new class extends Command {
      name = commandObject.name;
      description = commandObject.description;
      options = new OptionsManager([subcommand]);
    }
    expect(command.data).toEqual(commandObject);
  })
})