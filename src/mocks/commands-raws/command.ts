export const commandRaw = {
  "description": "a top level command",
  "name": "top",
  "options": [
    {
      "description": "a subcommand",
      "name": "subcommand",
      "options": [
        {
          "choices": [],
          "description": "channel field",
          "name": "channel",
          "required": true,
          "type": 7
        }
      ],
      "type": 1
    },
    {
      "description": "a subcommand group",
      "name": "group",
      "options": [
        {
          "description": "a subcommand inside a group",
          "name": "subcommandinsidegroup",
          "options": [],
          "type": 1
        }
      ],
      "type": 2
    }
  ],
  "type": 1
}