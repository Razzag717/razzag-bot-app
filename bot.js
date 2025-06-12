const irc = require('irc');

const config = {
  channels: ['#Kuwait', '#Razzag.com', '#Underground'],
  server: 'irc.dal.net',
  botName: 'Razzag_'
};

const bot = new irc.Client(config.server, config.botName, {
  channels: config.channels,
});

bot.addListener('registered', () => {
  console.log(`Connected to ${config.server} as ${config.botName}`);
});

bot.addListener('message', (from, to, message) => {
  console.log(`${from} => ${to}: ${message}`);

  // Respond to "!roll" command
  if (message.trim().toLowerCase() === '!roll') {
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    const total = dice1 + dice2;

    const replyTarget = to.startsWith('#') ? to : from; // reply in channel or PM

    bot.say(replyTarget, `${from} rolled 🎲 ${dice1} and 🎲 ${dice2} — total: ${total}`);
  }
});
