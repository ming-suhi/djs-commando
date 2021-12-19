/** 
 * Interface for field choices.
 */
export interface choice { 
  /**
   * The name of the choice
   */
   name: string, 
   /**
    * The value to pass when choice is selected
    */
   value: string 
};

/**
 * Interface for field creation.
 */
export default interface Field {
  /**
   * The type of field.
   */
  type: number;
  /**
   * The name of the field.
   */
  name: string;
  /**
   * The description of the field.
   */
  description: string;
  /**
   * If field is required.
   */
  required: boolean;
  /**
   * The choices for the field.
   */
  choices: choice[];
}

/**
 * Base field structure.
 * Do not use for creating fields.
 */
export default class Field {
  /**
   * The raw object for field data. Used to interact with discord.
   */
  get rawData() {
    return ({
      name: this.name,
      description: this.description,
      required: this.required,
      choices: this.choices,
      type: this.type
    })
  }
}