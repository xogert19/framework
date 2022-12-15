class User {
  constructor(email, password) {
    this._email = email;
    this._password = password;
  }

  getEmail = () => this._email;
  getPassword = () => this._password;
}

module.exports = User;
