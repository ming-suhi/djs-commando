## Adding Components

To add components simply pass the component object as a second argument to the sendMessage method, or the sendEmbed method. 
Components on ephemeral message and ephemeral embed are currently not supported. 
Refer to Discord Developer Portal for an in-depth guide on making component objects.

Example
```js
const {Command} = require('@ming-suhi/djs-local-manager');

class Compliment extends Command {
  constructor() {
    super();
    this.name = "compliment";
    this.description = 'bot compliments user';
  }

  async execute(service) {
    const button = [
      {
        "type": 1,
        "components": [
          {
            "type": 2,
            "label": "Thank me!",
            "style": 1,
            "custom_id": "string_id_here"
          }
        ]
      }
    ]
    await service.sendMessage('You are great', button);
  }

  async onPress(service) {
    await service.sendMessage('You are welcome!');
  }
}

module.exports = Compliment;
```

## Handling multiple buttons

onPress receives all button interaction in that command. In the case of multiple buttons, you can handle it by accessing the button's custom_id. You can access it through `service.data.custom_id`.

```js
async onPress(service) {
  switch(service.data.custom_id){
    case "button_one":
    // If button_one is pressed
    break;

    case "button_two":
    // If button_two is pressed
  }
}
```

## Handling multiple select menus

onSelect receives all select menus created in that command. Handling multile select menus is the same as handling multiple buttons.
Access the component's id through `service.data.custom_id`. To get select menu values access it through the `service.data.values`.

```js
async onSelect(service) {
  switch(service.data.custom_id){
    case "menu_one":
    // If menu_one is submitted
    break;

    case "menu_two":
    // If menu_two is submitted
  }
}
```