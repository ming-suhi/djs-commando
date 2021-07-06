const {Command, SubCommand, SubCommandGroup, IntegerField} = require('../../src/index.js');

const field_one = new IntegerField("field_one", "enter role here", true);

const region = new class extends SubCommand {
  constructor() {
    super([field_one]);
    this.name = "region";
    this.description = "opens a region role manager";
    this.botPermissions = ['MANAGE_ROLES'];
    this.executePermissions = ['MANAGE_ROLES'];
  }

  async execute(service){
    try {
      await this.botCheck(service);
      await this.executeCheck(service);
      await service.sendMessage('Success');
    }catch(e){
      await service.sendEphemeral(e);
    }
  }
}

const manager = new class extends SubCommandGroup {
  constructor() {
    super([region]);
    this.name = "manager";
    this.description = "open a role manager";
  }
}

const roles = new class extends Command {
  constructor() {
    super([manager]);
    this.name = "roles";
    this.description = "manage roles";
  }
}

module.exports = roles;
//roles.options.find(option => option.name == "manager")
console.log(roles.data);