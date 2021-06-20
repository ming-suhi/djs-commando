const Folder = require('../structures/folder.js');
const GlobalCommand = require('../structures/global-command.js')


class CommandsManager extends Folder {

  /**
   * Manages the commands folder
   * Path: local/{path}
   * @augments Folder
   * @param {folderPath} path path from root leading to folder
   */
  constructor(path) {
    super(path);
  }


  /**
   * Finds requested command
   * @param {Interaction} interaction interaction 
   */
   async match(interaction){
    const command = await this.get(interaction.request.data.name);
    const security = command.security(await interaction.author());
    switch (security.pass) {
      case true:
      command.execute(interaction);
      break;
    
      case false:
      interaction.responseType = 3;
      interaction.sendEphemeral(`You are missing permissions to run this command: \`${security.missingPermissions.join(' | ').replace(/_/g, ' ')}\``);
    }
  }


  /**
   * Sync Discord with local commands
   * @param {Discord.Client} client discord client 
   */
  async sync(client) {
    const commands = await this.get();
    for (let command of commands) {
      command.post(client);
    }

    const globalCommands = await client.api.applications(client.user.id).commands.get();
    for (let command of globalCommands){
      try {
        const match = await this.get(command.name);
      }catch {
        const commandRef = new GlobalCommand(command);
        await commandRef.get(client);
        await commandRef.delete(client);
      }
    }
  }
}

module.exports = CommandsManager;