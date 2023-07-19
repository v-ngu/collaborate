const isRequired = require('../utils/isRequired');

class UserSchema {
  constructor(
    id = isRequired("id"),
    email = isRequired("email"),
    firstName,
    lastName,
  ) {
    this._id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
}

module.exports = UserSchema;