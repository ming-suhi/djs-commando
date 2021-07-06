## Command Fields

Command fields is used to ask for user input on slash command

## Creating a command with a command field

1. Create a file with the same name as the command.

2. Require/import `Command` and chosen `Field` class
    ```js
    const {Command, StringField} = require('@ming-suhi/djs-local-manager');
    ```

3. Create an instance of the chosen `Field` class
    ```js
    const content = new StringField('content', 'string to echo', true);
    ```

4. Extend `Command` to create command
    ```js
    const echo = new class extends Command {
      constructor() {
      }
    }
    ```

5. Pass on field instance inside an array to `super`
    ```js
    super([content]);
    ```

6. Define command required properties
    ```js
    this.name = 'echo'
    this.description = 'echos content'
    ```

7. Export command 
    ```js
    module.exports = echo;
    ```