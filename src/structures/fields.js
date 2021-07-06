class Field {

  // Base class for command fields
  constructor(name, description, type, required, choices) {
    this.name = name;
    this.description = description;
    this.type = type;
    this.required = required;
    this.choices = choices
  }


  // Returns class as object
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

class StringField extends Field {

  /**
   * String field structure
   * @param {string} name field name
   * @param {string} description field description
   * @param {boolean} required if required
   * @param {array<object>} choices array of field choices
   */
  constructor(name, description, required, choices) {
    super(name, description, 3, required, choices);
  }
}

class IntegerField extends Field {

  /**
   * Integer field structure
   * @param {string} name field name
   * @param {string} description field description
   * @param {boolean} required if required
   * @param {array<object>} choices array of field choices
   */
  constructor(name, description, required, choices) {
    super(name, description, 4, required, choices);
  }
}

class BooleanField extends Field {

  /**
   * Boolean field structure
   * @param {string} name field name
   * @param {string} description field description
   * @param {boolean} required if required
   */
  constructor(name, description, required) {
    super(name, description, 5, required);
  }
}

class UserField extends Field {

  /**
   * User field structure
   * @param {string} name field name
   * @param {string} description field description
   * @param {boolean} required if required
   */
  constructor(name, description, required) {
    super(name, description, 6, required);
  }
}

class ChannelField extends Field {

  /**
   * Channel field structure
   * @param {string} name field name
   * @param {string} description field description
   * @param {boolean} required if required
   */
  constructor(name, description, required) {
    super(name, description, 7, required);
  }
}

class RoleField extends Field {

  /**
   * Role field structure
   * @param {string} name field name
   * @param {string} description field description
   * @param {boolean} required if required
   */
  constructor(name, description, required) {
    super(name, description, 8, required);
  }
}

class MentionableField extends Field {

  /**
   * Mentionable field structure
   * @param {string} name field name
   * @param {string} description field description
   * @param {boolean} required if required
   */
  constructor(name, description, required) {
    super(name, description, 9, required);
  }
}

module.exports = {StringField, IntegerField, BooleanField, UserField, ChannelField, RoleField, MentionableField};