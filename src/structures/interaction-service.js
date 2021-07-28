const {createAPIMessage} = require('../utilities/discord.js');


class InteractionService{


  /**
   * Structure to help in interacting with Discord
   * @param {Discord.Client} client instance of Discord Client 
   * @param {Discord.Interaction} interaction interaction object
   */
  constructor(client, interaction) {
    Object.assign(this, interaction)
    this.client = client;
    this.responseType = 4;
  }

  /**
   * Respond to an interaction
   * @param {object} data response to interaction 
   * @param {string} [data.content] message to send
   * @param {Discord.MessageEmbed} [data.embed] embed to send
   * @param {array<Discord.Component>} [data.components] components to send
   * @param {boolean} [data.visible] if message is visible to non-users
   */
  async send({content, embed, components, visible = true}) {
    const data = {type: this.responseType};
    if(embed) {
      data.data = await createAPIMessage(this.client, this.channel_id, embed);
    }
    if(content) {
      data.data.content = content;
    }
    if(components) {
      data.data.components = components;
    }
    if(visible == false) {
      data.data.flags = 64;
    }
    this.client.api.interactions(this.id, this.token).callback.post({data});
  }
}

module.exports = InteractionService;