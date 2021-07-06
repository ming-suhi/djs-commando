## Subcommand structure

- Subcommands does not inherit anything from the main command

- It has a separate security

- Subcommands have their own `execute`, `onPress`, and `onSelect` methods

## Creating a command with a subcommand

1. Create a file with the same name as the command(not subcommand).

2. Require/import `Command` and `SubCommand`
    ```js
    const {Command, SubCommand} = require('@ming-suhi/djs-local-manager');
    ```

3. Extend `SubCommand` to create a subcommand
    ```js
    const add = new class extends SubCommand {
      constructor() {
      }
    }
    ```

4. Define subcommand required properties.
    ```js
    this.name = "add";
    this.description = "adds role to member";
    ```

5. Extend `Command` to create command
    ```js
    const role = new class extends Command {
      constructor() {
      }
    }
    ```

6. Pass on subcommand inside an array to `super`
    ```js
    super([add]);
    ```

7. Define command required properties.
    ```js
    this.name = "role";
    this.description = "manage role";
    ```

8. Export command(not subcommand)
    ```js
    module.exports = role;
    ```