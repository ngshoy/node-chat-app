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
  let li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
  const li = jQuery('<li></li>');
  const a = jQuery('<a target="_blank">My current location</a>');

  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
});

socket.emit('createMessage', {
  from: 'Andrew',
  text: 'Yup, that works for me.',
  createdAt: new Date()
}, () => console.log('got it'));

jQuery('#message-form').on('submit', e => {
  e.preventDefault();
  const messageTextbox = jQuery('[name=message]'); 

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, () => {
    messageTextbox.val('');
  });
});

const locationButton = jQuery('#send-location');
locationButton.on('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }
  navigator.geolocation.getCurrentPosition(position => {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, () => {
    alert('Unable to fetch location.');
  });
});