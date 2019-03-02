class Users {
  constructor() {
    this.users = [];
  }

  addUser(id, name, room) {
    const user = {
      id,
      name,
      room
    };
    this.users.push(user);
    return user;
  }

  getUserList(room) {
    return this.users.filter((user) => user.room === room)
      .map((user) => user.name);
  }

  getUser(id) {
    return this.users.filter((user) => user.id === id)[0]
  }
}

module.exports = {
  Users
};