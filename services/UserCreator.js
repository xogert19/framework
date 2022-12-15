const TestDataReader = require("../services/TestDataReader");

const User = require("../model/User");

class UserCreator {
  static async getCredentialsFromProperties() {
    const userProperties = await TestDataReader.getTestData("user.properties");
    for (const key in userProperties) {
      this[key] = userProperties[key];
    }

    return this;
  }

  static async withCredentialsFromProperties() {
    await this.getCredentialsFromProperties();

    return new User(this.email, this.password);
  }

  static async getUserWithoutPassword() {
    await this.getCredentialsFromProperties();

    return new User(this.email, "");
  }

  static async getUserWithoutEmail() {
    await this.getCredentialsFromProperties();

    return new User("", this.password);
  }
}

module.exports = UserCreator;
