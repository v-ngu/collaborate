const isRequired = require('../utils/isRequired');

class UserSchema {
  constructor(email = isRequired("email"), firstName, lastName,  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
}

module.exports = UserSchema;