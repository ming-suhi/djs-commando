/**
 * @typedef {object} commandObject 
 * @property {string} name name of command
 * @property {string} description description of command
 * @property {array<commandOption>} [options] options
 * @property {array<permission>} permissions required permissions to run command
 * @property {function} execute the function to be run when command is received
 */

/**
 * @typedef {object} commandOption
 * @property {commandOptionType} type
 * @property {string} name name of option
 * @property {string} description description of option
 * @property {boolean} [required] if option is required, defaults to false
 * @property {array<commandOptionChoice>} [choices] choices
 * @property {array<commandOption>} [options] options
 */