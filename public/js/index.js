const socket = io();

socket.on('connect', () => {
  const connTime = new Date();
  console.log(`Connected to Server on ${connTime.toLocaleString()}`);
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('newMessage', message => {
  const formattedTime = moment(message.createdAt).format('h:mm a');
  const template = jQuery('#message-template').html();
  const html = Mustache.render(template, { 
    text: message.text, 
    from: message.from, 
    createdAt: formattedTime 
  });

  jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function (message) {
  const formattedTime = moment(message.createdAt).format('h:mm a');
  const li = jQuery('<li></li>');
  const a = jQuery('<a target="_blank">My current location</a>');

  li.text(`${message.from} ${formattedTime}: `);
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
  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(position => {
    locationButton.removeAttr('disabled').text('Send location'); 
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, () => {
    locationButton.removeAttr('disabled').text('Send location'); 
    alert('Unable to fetch location.');
  });
});