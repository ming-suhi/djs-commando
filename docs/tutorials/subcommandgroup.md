## Creating a command with a subcommand under a subcommand group

1. Create a file with the same name as the command(not subcommand).

2. Require/import `Command`, `SubCommand`, and `SubCommandGroup`
    ```js
    const {Command, SubCommand, SubCommandGroup} = require('@ming-suhi/djs-local-manager');
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
    this.description = "adds permission to role"
    ```

5. Extend `SubCommandGroup` to create subcommand group
    ```js
    const role = new class extends SubCommandGroup {
      constructor() {
      }
    }
    ```

6. Pass on subcommand inside an array to `super`
    ```js
    super([add]);
    ```

7. Define subcommand group required properties.
    ```js
    this.name = "role";
    this.description = "manage role permissions"
    ```

8. Extend `Command` to create command
    ```js
    const permission = new class extends Command {
      constructor() {
      }
    }
    ```

9. Pass on subcommand group inside an array to `super`
    ```js
    super([role]);
    ```

7. Define command required properties.
    ```js
    this.name = "permission";
    this.description = "manage permissions"
    ```

8. Export command(not subcommand)
    ```js
    module.exports = permission;
    ```