module.exports = class UserDto {
  email;
  _id;
  isActivated;
  role;
  name;
  registrated;
  lastEnter;

  constructor({ email, _id, isActivated, role, name, registrated, lastEnter }) {
    [
      this.email,
      this._id,
      this.isActivated,
      this.role,
      this.name,
      this.registrated,
      this.lastEnter,
    ] = [email, _id, isActivated, role, name, registrated, lastEnter];
  }
}
