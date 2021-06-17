const Folder = require('../structures/folder.js');


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
}

module.exports = CommandsManager;