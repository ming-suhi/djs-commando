import SlashCommandBuilder from "./slash-command-builder";
import { FieldType } from "./field-consumer";

/** Subcommand */
export class Subcommand extends SlashCommandBuilder<FieldType[]> {
  readonly type = 1;
}

/** Subcommand Group */
export class SubcommandGroup extends SlashCommandBuilder<Subcommand[]> {
  readonly type = 2;
}

/** Command */
export class Command extends SlashCommandBuilder<(SubcommandGroup | Subcommand)[] | FieldType[]> {
  readonly type = 1;
}