const generateMessage = (from, text) => ({
  from,
  text,
  createdAt: new Date()
});

const generateLocationMessage = (from, lat, long) => ({
  from,
  url: `https://www.google.com/maps?q=${lat},${long}`,
  createdAt: new Date()
});

module.exports = {
  generateMessage,
  generateLocationMessage
};