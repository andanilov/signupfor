module.exports = class UserDto {
  email;
  _id;
  isActivated;
  role;
  name;

  constructor({ email, _id, isActivated, role, name }) {
    [
      this.email,
      this._id,
      this.isActivated,
      this.role,
      this.name,
    ] = [email, _id, isActivated, role, name];
  }
}
