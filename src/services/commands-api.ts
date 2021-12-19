import fetch from "node-fetch-retry";

/**
 * For interacting with Discord API.
 */
export default class CommandsAPIService {
  /**
   * Get all bot commands data from Discord.
   * @param appId Application Id
   * @param token Bot token
   */
  static async getCommands(appId: string, token: string): Promise<any[]> {
    const response = await fetch(`https://discord.com/api/v8/applications/${appId}/commands`, {
      method: 'GET',
      headers: {'Authorization': `Bot ${token}`},
      retry: 3, 
      pause: 5000,
      silent: true
    })
    const commands = response.json();
    return commands;
  }

  /**
   * Post command data to Discord.
   * @param appId Application Id
   * @param token Bot token
   * @param data Command data
   */
  static async postCommand(appId: string, token: string, data: any) {
    const response = await fetch(`https://discord.com/api/v8/applications/${appId}/commands`, {
      method: 'POST',
      headers: {
        'Authorization': `Bot ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
      retry: 3, 
      pause: 5000,
      silent: true
    });
    const status = await response.json();
    console.log(status)
    return status;
  }


  /**
   * Delete a command by id.
   * @param appId Application Id
   * @param token Bot token
   * @param commandId Command Id
   */
  static async deleteCommand(appId: string, token: string, commandId: string) {
    const response = await fetch(`https://discord.com/api/v8/applications/${appId}/commands/${commandId}`, {
      method: 'DELETE',
      headers: {'Authorization': `Bot ${token}`},
      retry: 3, 
      pause: 5000,
      silent: true
    });
    const status = await response.text();
    return status;
  }
}