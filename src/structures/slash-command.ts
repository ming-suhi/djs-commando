import { CommandInteraction } from "discord.js";
import { FieldType } from "./field";

/** 
 * Interface for slash command creation.
 */
interface SlashCommandBuilder<TOptions extends any[]> {
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
  execute(interaction: CommandInteraction): void;
}

/**
 * Managed slash command structure for creating slash command types(have options property).
 */
abstract class SlashCommandBuilder<TOptions extends any[]> {
  /**
   * Type of command or option.
   */
  abstract type: number;
  /**
   * Raw data of options
   */
  readonly options: any[];
  /**
   * The mapped options.
   * Used for easily finding options using option name.
   */
  private _options!: any[];
  /**
   * @param _options The options for the command.
   */
  constructor(_options: TOptions | [] = []) {
    this.options = _options.map(option => ({...option}));
    Object.defineProperty(this, "_options", { value: _options, enumerable: false });
  };
  /**
   * The raw object for command data. Used to interact with discord.
   */
  getOption(name: string): TOptions[number] {
    return this._options.find(option => option.name == name);
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
export abstract class SlashCommand extends SlashCommandBuilder<(SubcommandGroup | Subcommand)[] | FieldType[]> {
  readonly type = 1;
}