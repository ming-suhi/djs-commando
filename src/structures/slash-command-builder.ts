import { CommandInteraction } from "discord.js";
import SlashCommand from "./slash-command";

/**
 * Interface for creating slash command creation.
 */
export default interface SlashCommandBuilder<TOptions extends Array<any>> extends Omit<SlashCommand, "options"> {
  /**
   * The function to execute when command is called
   * @param interaction The command interaction object
   */
  execute(interaction: CommandInteraction): void;
}

/**
 * Managed slash command structure for creating slash command types(have options property).
 */
export default class SlashCommandBuilder<TOptions extends Array<any>> {
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
  get rawData(): SlashCommand["rawData"] {
    return ({
      name: this.name,
      description: this.description,
      options: this._options.map(option => option.rawData),
      type: this.type
    })
  }
}