const expect = require('expect');
const {
  generateMessage
} = require('./message');

describe('generateMessage', () => {
  const from = 'Jen';
  const text = 'Some message';
  const message = generateMessage(from, text);

  expect(message.from).toEqual(from);
  expect(message.text).toEqual(text);
  expect(message.createdAt).toBeA('number');
})