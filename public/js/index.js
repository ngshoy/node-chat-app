const socket = io();

const scrollToBottom = () => {
  const messages = jQuery('#messages');
  const newMessage = messages.children('li:last-child');
  
  const clientHeight = messages.prop('clientHeight'); 
  const scrollTop = messages.prop('scrollTop'); 
  const scrollHeight = messages.prop('scrollHeight'); 
  const newMessageHeight = newMessage.innerHeight(); 
  const lastMessageHeight = newMessage.prev().innerHeight(); 
    
  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) { 
    messages.scrollTop(scrollHeight);
  }
}

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
  scrollToBottom();
});

socket.on('newLocationMessage', function (message) {
  const formattedTime = moment(message.createdAt).format('h:mm a');
  const template = jQuery('#location-message-template').html();
  const html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
  scrollToBottom();
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