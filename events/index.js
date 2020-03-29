const path = require('path')
const Events = require('events');
const AppEvents = new Events();

AppEvents.on('MY_EVENT', async (obj) => {
  // TODO
})

module.exports = AppEvents