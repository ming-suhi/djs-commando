/** Field classes */
export type Fields = StringField | IntegerField | BooleanField | UserField | ChannelField | RoleField | MentionableField | NumberField;

/** Interface for choice creation */
export interface Choice { name: string, value: string };

/** Base structure for fields */
export class BaseField {
  /** The name of the field */
  name: string;
  /** The description of the field */
  description: string;
  /** The type of the field */
  type: number;
  /** If field is required */
  required: boolean;
  /** The choices of the field */
  choices?: Array<Choice>;

  /**
   * @param name The name of the field
   * @param description The description of the field
   * @param type The type of the field
   * @param required If field is required
   * @param choices The choices of the field
   */
  constructor(name: string, description: string, type: number, required: boolean = false, choices?: Array<Choice>) {
    this.name = name;
    this.description = description;
    this.type = type;
    this.required = required;
    this.choices = choices;
  }

  /**
   * Get field data
   * @returns Field as object
   */
  get data() {
    return({
      name: this.name,
      description: this.description,
      type: this.type,
      required: this.required,
      choices: this.choices
    })
  }
}

/** Structure for creating a string field */
export class StringField extends BaseField {
  /**
   * @param name The name of the field
   * @param description The description of the field
   * @param required If field is required
   * @param choices The choices of the field
   * @augments BaseField
   */
  constructor(name: string, description: string, required: boolean = false, choices?: Array<Choice>) {
    super(name, description, 3, required, choices);
  }
}

/** Structure for creating an integer field */
export class IntegerField extends BaseField {
  /**
   * @param name The name of the field
   * @param description The description of the field
   * @param required If field is required
   * @augments BaseField
   */
  constructor(name: string, description: string, required: boolean = false) {
    super(name, description, 4, required);
  }
}

/** Structure for creating a boolean field */
export class BooleanField extends BaseField {
  /**
   * @param name The name of the field
   * @param description The description of the field
   * @param required If field is required
   * @augments BaseField
   */
  constructor(name: string, description: string, required: boolean = false) {
    super(name, description, 5, required);
  }
}

/** Structure for creating a user field */
export class UserField extends BaseField {
  /**
   * @param name The name of the field
   * @param description The description of the field
   * @param required If field is required
   * @augments BaseField
   */
  constructor(name: string, description: string, required: boolean = false) {
    super(name, description, 6, required);
  }
}

/** Structure for creating a channel field */
export class ChannelField extends BaseField {
  /**
   * @param name The name of the field
   * @param description The description of the field
   * @param required If field is required
   * @augments BaseField
   */
  constructor(name: string, description: string, required: boolean = false) {
    super(name, description, 7, required);
  }
}

/** Structure for creating a role field */
export class RoleField extends BaseField {
  /**
   * @param name The name of the field
   * @param description The description of the field
   * @param required If field is required
   * @augments BaseField
   */
  constructor(name: string, description: string, required: boolean = false) {
    super(name, description, 8, required);
  }
}

/** Structure for creating a mentionable field */
export class MentionableField extends BaseField {
  /**
   * @param name The name of the field
   * @param description The description of the field
   * @param required If field is required
   * @augments BaseField
   */
  constructor(name: string, description: string, required: boolean = false) {
    super(name, description, 9, required);
  }
}

/** Structure for creating a number field */
export class NumberField extends BaseField {
  /**
   * @param name The name of the field
   * @param description The description of the field
   * @param required If field is required
   * @augments BaseField
   */
  constructor(name: string, description: string, required: boolean = false) {
    super(name, description, 10, required);
  }
}