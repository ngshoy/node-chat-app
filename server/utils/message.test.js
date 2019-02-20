const expect = require('expect');
const {
  generateMessage
} = require('./message');

describe('generateMessage', () => {

  it('should generate a message', () => {
    const from = 'Jen';
    const text = 'Some message';
    const message = generateMessage(from, text);
  
    expect(message).toMatchObject({from, text});
    expect(typeof message.createdAt).toBe('object');
  });
})