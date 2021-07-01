## A. Creating commands

1. Create a file inside the commands folder

2. Require/import `@ming-suhi/djs-local-manager`
    ```js
    const Manager = require('@ming-suhi/djs-local-manager');
    ```

3. Create and export instance of GlobalCommand
    ```js
    module.exports = new Manager.GlobalCommand(commandData);
    ```

    Example
    ```js
    const Manager = require('@ming-suhi/djs-local-manager');

    module.exports = new Manager.GlobalCommand({
      name: 'ping',
      description: 'pings bot to get latency',
      permissions: ["SEND_MESSAGES"],
      async execute(interaction) {
        //send latency to channel
        interaction.sendMessage(`Bot ping is: ${Math.round(interaction.client.ws.ping)}ms`);
      }
    });
    ```

## B. Registering commands

1. Listen to `ready`
    ```js
    //Triggers on ready
    client.on('ready', async() => {
      //code here
    });
    ```

2. Sync commands
    ```js
    client.msdm.syncCommands(client);
    ```

    Resulting code:
    ```js
    client.on('ready', async() => {
      client.msdm.syncCommands(client);
    });
    ```

## C. Handling commands

1. Listen to `INTERACTION_CREATE`
    ```js
    //Triggered on Slash Commands
    client.ws.on('INTERACTION_CREATE', async request => {
      //code here
    });
    ```

2. Create an instance of Manager Interaction
    ```js
    const interaction = new Manager.Interaction(client, request);
    ```

3. Execute requested command
    ```js
    client.msdm.matchCommand(interaction);
    ```

   Resulting code:
    ```js
    client.ws.on('INTERACTION_CREATE', async request => {
      const interaction = new Manager.Interaction(client, request);
      client.msdm.matchCommand(interaction);
    });
    ```