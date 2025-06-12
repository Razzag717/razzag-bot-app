const irc = require('irc');

// Your existing IRC bot code here
const config = {
  channels: ['#Kuwait', '#Razzag.com', '#underground'],
  server: 'irc.dal.net',
  botName: 'RazzB'
};

const bot = new irc.Client(config.server, config.botName, {
  channels: config.channels,
});

bot.addListener('registered', () => {
  console.log(`Connected to ${config.server} as ${config.botName}`);
});

bot.addListener('message', (from, to, message) => {
  console.log(`${from} => ${to}: ${message}`);

  if (message.trim().toLowerCase() === '!roll') {
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    const total = dice1 + dice2;

    const replyTarget = to.startsWith('#') ? to : from;
    bot.say(replyTarget, `${from} rolled 🎲 ${dice1} and 🎲 ${dice2} — total: ${total}`);
  }
});

// --- Add this HTTP server code at the bottom ---
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Bot is running\n');
});

server.listen(8080, () => {
  console.log('HTTP server listening on port 8080');
});
