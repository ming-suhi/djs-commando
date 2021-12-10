/** 
 * Interface to interact choices with Discord API.
 */
export interface rawChoice { 
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
 * Interface to interact fields with Discord API. 
 */
export interface rawField {
  /**
   * The name of the field
   */
  name: string,
  /**
   * The description of the field
   */
  description: string,
  /**
   * The type of the field
   */
  type: number,
  /**
   * If field is required
   */
  required: boolean,
  /**
   * The choices for field value
   */
  choices: rawChoice[]
}