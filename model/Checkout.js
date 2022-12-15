class Checkout {
  constructor(
    firstName,
    lastName,
    address,
    city,
    state,
    zip,
    phoneNumber,
    email,
    firstNameXpath,
    lastNameXpath,
    addressXpath,
    cityXpath,
    stateXpath,
    zipXpath,
    phoneNumberXpath,
    emailXpath,
    saveAndContinueButtonXpath,
    totalPriceXpath,
    stateValue
  ) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._address = address;
    this._city = city;
    this._state = state;
    this._zip = zip;
    this._phoneNumber = phoneNumber;
    this._email = email;
    this._firstNameXpath = firstNameXpath;
    this._lastNameXpath = lastNameXpath;
    this._addressXpath = addressXpath;
    this._cityXpath = cityXpath;
    this._stateXpath = stateXpath;
    this._zipXpath = zipXpath;
    this._phoneNumberXpath = phoneNumberXpath;
    this._emailXpath = emailXpath;
    this._saveAndContinueButtonXpath = saveAndContinueButtonXpath;
    this._totalPriceXpath = totalPriceXpath;
    this._stateValue = stateValue;
  }

  getFirstName = () => this._firstName;
  getLastName = () => this._lastName;
  getAddress = () => this._address;
  getCity = () => this._city;
  getState = () => this._state;
  getZip = () => this._zip;
  getPhoneNumber = () => this._phoneNumber;
  getEmail = () => this._email;

  getFirstNameXpath = () => this._firstNameXpath;
  getLastNameXpath = () => this._lastNameXpath;
  getAddressXpath = () => this._addressXpath;
  getCityXpath = () => this._cityXpath;
  getStateXpath = () => this._stateXpath;
  getZipXpath = () => this._zipXpath;
  getPhoneNumberXpath = () => this._phoneNumberXpath;
  getEmailXpath = () => this._emailXpath;

  getSaveAndContinueButtonXpath = () => this._saveAndContinueButtonXpath;
  getTotalPriceXpath = () => this._totalPriceXpath;

  getStateValue = () => this._stateValue;
}

module.exports = Checkout;
