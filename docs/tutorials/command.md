## Creating basic commands

1. Create a file inside the commands folder, file name must be the same as command name

2. Require/import `Command`
    ```js
    const {Command} = require('@ming-suhi/djs-local-manager');
    ```

3. Extend `Command`
    ```js
    class MyCommand extends Command {
      constructor() {
        super();
        // Properties here
      }
    }
    ```

4. Set class properties
    ```js
    this.name = "mycommand";
    this.description = 'my custom command';
    ```

5. Create `execute` method
    ```js
    async execute(service) {
      await service.sendMessage('Your command has been heard');
    }
    ```

6. Export created class
    ```js
    module.exports = MyCommand;
    ```

    Example
    ```js
    const {Command} = require('@ming-suhi/djs-local-manager');

    class Ping extends Command {
      constructor() {
        super();
        this.name = "ping";
        this.description = 'pings bot to get latency';
      }

      async execute(service) {
        await service.sendMessage('Pong');
      }
    }

    module.exports = Ping;
    ```

## Understanding service parameter

`service` is a copy of interaction object, with added tools to aid in interacting with Discord. You can look up for InteractionService class to know more about the tools it can offer. You can look up interaction object in Discord Developer portal to know more about the properties.

## Adding command options

Simply add options to options property. Refer to Discord Developer Portal to create command options object.

## Handling subcommand groups and subcommands

Use `service` to access datas on subcommand groups and subcommands. Refer to Discord Developer portal to know more about the structure of the interaction object.

## Stating a response type

responseType property defaults to 4 (respond with a message)

1. Simply access responseType through service parameter and edit it

2. To acknowledge a ping, just send an empty message
    ```js
    service.responseType = 1;
    await service.sendMessage();
    ```