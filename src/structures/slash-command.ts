import { ChatInputCommandInteraction } from "discord.js";
import { FieldType } from "./field";

/** 
 * Interface for slash command creation.
 */
export default interface SlashCommandBuilder<TOptions extends any[]> {
  /**
   * The name of the command.
   */
  name: string,
  /**
   * The description of the command.
   */
  description: string
  /**
   * The function to execute when command is called
   * @param interaction The command interaction object
   */
  execute(interaction: ChatInputCommandInteraction): void;
}

/**
 * Managed slash command structure for creating slash command types(have options property).
 */
export default abstract class SlashCommandBuilder<TOptions extends any[]> {
  /**
   * Type of command or option.
   */
  abstract type: number;
  /**
   * The mapped options.
   * Used for easily finding options using option name.
   */
  readonly options: Map<string, TOptions[number]>
  /**
   * @param _options The options for the command.
   */
  constructor(readonly _options: TOptions | [] = []) {
    this.options = new Map(_options.map(option => [option.name, option]));
  }
  /**
   * The raw object for command data. Used to interact with discord.
   */
  get rawData() {
    return ({
      name: this.name,
      description: this.description,
      options: this._options.map(option => option.rawData),
      type: this.type
    })
  }
}

/** Subcommand */
export abstract class Subcommand extends SlashCommandBuilder<FieldType[]> {
  readonly type = 1;
}

/** Subcommand Group */
export abstract class SubcommandGroup extends SlashCommandBuilder<Subcommand[]> {
  readonly type = 2;
}

/** Command */
export abstract class Command extends SlashCommandBuilder<(SubcommandGroup | Subcommand)[] | FieldType[]> {
  readonly type = 1;
}