const socket = io();

socket.on('connect', () => {
  const connTime = new Date();
  console.log(`Connected to Server on ${connTime.toLocaleString()}`);
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('newMessage', message => {
  console.log('newMessage', message);
});

socket.emit('createMessage', {
  from: 'Andrew',
  text: 'Yup, that works for me.',
  createdAt: new Date()
});