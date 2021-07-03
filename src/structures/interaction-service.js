const {createAPIMessage} = require('../utilities/discord.js');


class InteractionService{

  constructor(client, interaction) {
    Object.assign(this, interaction)
    this.client = client;
    this.responseType = 4;
  }

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

  async sendEmbed(embed, components) {
    const data = {
      type: this.responseType,
      components: components,
      data: await createAPIMessage(this.client, this.channel_id, embed)
    }
    this.client.api.interactions(this.id, this.token).callback.post({data});
  }
}

module.exports = InteractionService;