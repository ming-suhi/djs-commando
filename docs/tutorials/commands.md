## Creating basic commands

1. Create a file inside the commands folder, file name must be the same as command name

2. Require/import `Command`
    ```js
    const {Command} = require('@ming-suhi/djs-local-manager');
    ```

3. Extend `Command`
    ```js
    const myCommand = new class extends Command {
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
    module.exports = myCommand;
    ```

    Example
    ```js
    const {Command} = require('@ming-suhi/djs-local-manager');

    const ping = new class extends Command {
      constructor() {
        super();
        this.name = "ping";
        this.description = 'pings bot to get latency';
      }

      async execute(service) {
        await service.sendMessage('Pong');
      }
    }

    module.exports = ping;
    ```

## Understanding service parameter

`service` is a copy of interaction object, with added tools to aid in interacting with Discord. You can look up for InteractionService class here to know more about the tools it can offer. You can look up interaction object in Discord Developer portal to know more about the properties.

## Stating a response type

responseType property defaults to 4 (respond with a message)

To state a response type simply access responseType through service parameter

```js
service.responseType = 5
```