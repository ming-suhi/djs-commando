class Command{

  /**
   * Command Structure
   */
  constructor() {
  }


  /**
   * Check user permissions
   * @param {Discord.GuildMember} user guild member to check
   * @returns {securityResult}  
   */
  security(user) {
    const missingPermissions = (this.permissions || ['SEND_MESSAGES']).filter(p => !user.hasPermission(p))
    if (missingPermissions.length === 0) {
      return {missingPermissions: null, pass: true};
    } else {
      return {missingPermissions: missingPermissions, pass: false};
    }
  }
}

module.exports = Command;