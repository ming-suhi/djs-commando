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
   * Send message
   * @param {string} content message to send
   * @param {array<Discord.Component>} [components] component object
   */
  async sendMessage(content, components) {
    const data = {
      type: this.responseType,
      data: {
        content: content,
        components: components
      }
    }
    this.client.api.interactions(this.id, this.token).callback.post({data});
  }
  

  /**
   * Send ephemeral message
   * @param {string} content message to send
   */
  async sendEphemeral(content) {
    const data = {
      type: this.responseType,
      data: {
        content: content,
        flags: 64
      }
    }
    this.client.api.interactions(this.id, this.token).callback.post({data});
  }


  /**
   * Send embed
   * @param {Discord.Embed} embed embed to send
   * @param {array<Discord.Component>} [components] component object
   */
  async sendEmbed(embed, components) {
    const data = {
      type: this.responseType,
      data: await createAPIMessage(this.client, this.channel_id, embed)
    }
    data.data.components = components;
    this.client.api.interactions(this.id, this.token).callback.post({data});
  }


  /**
   * Update the message the component is attached to
   * @param {string} content message to send
   * @param {Discord.Embed} embed embed to send
   * @param {array<Discord.Component>} [components] component object
   */
  async updateMessage(content, embed, components) {
    const data = {
      type: 7,
      data: await createAPIMessage(this.client, this.channel_id, embed)
    }
    data.data.content = content;
    data.data.components = components;
    this.client.api.interactions(this.id, this.token).callback.post({data});
  }
}

module.exports = InteractionService;