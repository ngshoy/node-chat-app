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
}

module.exports = {
  Users
};