const { StringField, Command, Subcommand } = require('../dist/index');

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
    type: undefined
  }

  var subcommandObject = {
    name: "subcommand",
    description: "a subcommand",
    options: [],
    type: 1
  }

  beforeEach(() => {
  });


  test('for fields', () => {
    const field = new StringField(fieldObject.name, fieldObject.description);
    expect(field.data).toEqual(fieldObject);
  });

  test('for basic command', () => {
    const command = new class extends Command {
      constructor() {
        super();
        this.name = commandObject.name;
        this.description = commandObject.description;
      }
    }
    expect(command.data).toEqual(commandObject);
  });

  test('for command with field', () => {
    commandObject.options = [fieldObject]
    const field = new StringField(fieldObject.name, fieldObject.description);
    const command = new class extends Command {
      constructor() {
        super([field]);
        this.name = commandObject.name;
        this.description = commandObject.description;
      }
    }
    expect(command.data).toEqual(commandObject);
  })

  test('command with subcommand', () => {
    commandObject.options = [subcommandObject]
    const subcommand = new class extends Subcommand {
      constructor() {
        super();
        this.name = subcommandObject.name;
        this.description = subcommandObject.description;
      }
    }
    const command = new class extends Command {
      constructor() {
        super([subcommand]);
        this.name = commandObject.name;
        this.description = commandObject.description;
      }
    }
    expect(command.data).toEqual(commandObject);
  })
})