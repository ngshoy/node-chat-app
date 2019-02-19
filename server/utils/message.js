
const generateMessage = (from, text) => ({
  from,
  text,
  createdAt: new Date()
});

module.exports = { generateMessage };
