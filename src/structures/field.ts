import { ApplicationCommandOptionType, APIApplicationCommandOptionChoice, ChannelType } from "discord-api-types/v10";

/**
 * Interface for creating field types
 */
interface FieldBuilderData {
  /**
   * The type of field
   */
  readonly type: number;
  /**
   * The name of the field
   */
  readonly name: string;
  /**
   * The description of the field
   */
  readonly description: string;
  /**
   * If the field is required
   */
  readonly required: boolean;
  /**
   * The choices for string, integer and number field
   */
  choices?: APIApplicationCommandOptionChoice[];
  /**
   * The channels shown will be restricted to these types
   */
  channel_types?: ChannelType[];
  /**
   * The minimum value for integer and number field
   */
  min_value?: number;
  /**
   * The maximum value for integer and number field
   */
  max_value?: number;
  /**
   * The minimum character length for the string field(0-6000)
   */
  min_length?: number;
  /**
   * The maximum character length for the string field(1-6000)
   */
  max_length?: number;
  /**
   * If autocomplete is enabled, for string, integer and number field
   */
  autocomplete?: Boolean;
}

/**
 * Managed field structure for creating field types
 */
abstract class FieldBuilder {
  /**
   * The type of field.
   */
  abstract type: number;
  /**
   * @param name The name of the field
   * @param description The description of the field
   * @param required If field is required
   */
  constructor(readonly name: string, readonly description: string, readonly required: boolean = false) { }
}

// Field type definitions
export class StringField extends FieldBuilder { readonly type = ApplicationCommandOptionType.String };
export class IntegerField extends FieldBuilder { readonly type = ApplicationCommandOptionType.Integer };
export class BooleanField extends FieldBuilder { readonly type = ApplicationCommandOptionType.Boolean };
export class UserField extends FieldBuilder { readonly type = ApplicationCommandOptionType.User };
export class ChannelField extends FieldBuilder { readonly type = ApplicationCommandOptionType.Channel };
export class RoleField extends FieldBuilder { readonly type = ApplicationCommandOptionType.Role };
export class MentionableField extends FieldBuilder { readonly type = ApplicationCommandOptionType.Mentionable };
export class NumberField extends FieldBuilder { readonly type = ApplicationCommandOptionType.Number };
export class AttachmentField extends FieldBuilder { readonly type = ApplicationCommandOptionType.Attachment };

/**
 * Interface for setting special property values
 */
interface FieldBuilderFunctions<T extends any> {
  /**
   * Sets choices property
   * @param choices An array of choices
   */
  setChoices(choices: APIApplicationCommandOptionChoice[]): T;
  /**
   * Limits channel inputs to these types
   * @param channel_types An array of channel types
   */
  setChannelTypes(channel_types: ChannelType[]): T;
  /**
   * Sets the min value for this field
   * @param min_value A number
   */
  setMinValue(min_value: number): T;
  /**
   * Sets the max value for this field
   * @param max_value A number
   */
  setMaxValue(max_value: number): T;
  /**
   * Sets the min char length for this field
   * @param min_length A number
   */
  setMinLength(min_length: number): T;
  /**
   * Sets the max char lenght for this field
   * @param max_length A number
   */
  setMaxLength(max_length: number): T;
  /**
   * Sets autocomplete to a value for this field
   * @param autocomplete A boolean
   */
  setAutocomplete(autocomplete: Boolean): T;
}

// Creates a setter function that is not enumerable
function createSetterProperty<T extends any>(name: string) {
  function setterFunction(this: FieldBuilder, value: T) {
    Object.defineProperty(this, name, { value, enumerable: true, writable: false });
    return this;
  }
  return { value: setterFunction, enumerable: false, writable: false };
}

// Field extra functions
const setChoices = createSetterProperty<APIApplicationCommandOptionChoice[]>("choices");
const setChannelTypes = createSetterProperty<ChannelType[]>("channel_types");
const setMinValue = createSetterProperty<number>("min_value");
const setMaxValue = createSetterProperty<number>("max_value");
const setMinLength = createSetterProperty<number>("min_length");
const setMaxLength = createSetterProperty<number>("max_length");
const setAutocomplete = createSetterProperty<Boolean>("autocomplete");

// Field extra functions
export interface StringField extends FieldBuilderData, Pick<FieldBuilderFunctions<StringField>, "setChoices" | "setMinLength" | "setMaxLength" | "setAutocomplete"> {}
export interface IntegerField extends FieldBuilderData, Pick<FieldBuilderFunctions<IntegerField>, "setChoices" | "setMinValue" | "setMaxValue" | "setAutocomplete"> {}
export interface ChannelField extends FieldBuilderData, Pick<FieldBuilderFunctions<ChannelField>, "setChannelTypes"> {}
export interface NumberField extends FieldBuilderData, Pick<FieldBuilderFunctions<NumberField>, "setChoices" | "setMinValue" | "setMaxValue" | "setAutocomplete"> {}
Object.defineProperties(StringField.prototype, { setChoices, setMinLength, setMaxLength, setAutocomplete });
Object.defineProperties(IntegerField.prototype, { setChoices, setMinValue, setMaxValue, setAutocomplete });
Object.defineProperties(ChannelField.prototype, { setChannelTypes });
Object.defineProperties(NumberField.prototype, { setChoices, setMinValue, setMaxValue, setAutocomplete });

/** Field Types */
export type FieldType = StringField | IntegerField | BooleanField | UserField | ChannelField | RoleField | MentionableField | NumberField | AttachmentField;