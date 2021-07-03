const Folder = require('../structures/folder.js');
const InteractionService = require('../structures/interaction-service.js');


class CommandsManager extends Folder {

  constructor(path) {
    super(path);
  }


  async match(client, interaction){
    var service = new InteractionService(client, interaction);
    switch(interaction.type) {

      case 2:
      var command = this.get(interaction.data.name);
      await new command().execute(service);
      break;

      case 3:
      var command = this.get(interaction.message.interaction.name);
      switch(interaction.data.component_type) {
        case 2:
        await new command().onPress(service);
        break;

        case 3:
        await new command().onSubmit(service);
      } 
    }
  }

  async sync(client){
    var commands = this.get();
    for (let command of commands) {
      new command().post(client);
    }

    var commands = await client.api.applications(client.user.id).commands.get();
    for (let command of commands) {
      try {
        this.get(command.name);
      }catch{
        await client.api.applications(client.user.id).commands(command.id).delete();
      }
    }
  }
}

module.exports = CommandsManager;