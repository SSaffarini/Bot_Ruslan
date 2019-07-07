
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const express = require('express')
const axios = require('axios');
const app = express()

const bot = new Telegraf("870904115:AAFg1PajuwWIj4P3Fbh6wCjodEF4OaqnUGQ")


app.get('/', function (req, res) {
  res.send('Hello World')
});

app.get('/hi', function (req, res) {
  res.send('Hi World ' + req.query.param);
  console.log('hi');
  bot.telegram.sendMessage(102242737, 'Hi ' + req.query.param);
});

// app.get('/hiSamer', function (req, res) {
//   res.send('Hi Samer ');
//   console.log('hi');
//   bot.telegram.sendMessage(102242737, 'Hi Samer');
// });

app.listen(3003)

const keyboard = Markup.inlineKeyboard([
  Markup.urlButton('❤️', 'http://telegraf.js.org'),
  Markup.callbackButton('Delete', 'delete')
])

bot.start((ctx) => ctx.reply('Hello'))
bot.help((ctx) => ctx.reply('Help message'))

bot.command('oldschool', (ctx) => ctx.reply('Hello'))
bot.command('modern', ({ reply }) => reply('Yo'))
bot.command('hipster', Telegraf.reply('λ'))
bot.command('dani', ({ reply }) => reply('Ha ha ha bot'))

bot.on('message', (ctx) => {
  console.log(ctx.from.id);
  const url = `https://api.eniro.com/cs/search/basic?profile=Massimo595&key=1798784303705856839&country=se&version=1.1.3&search_word=${ctx.message.text}&geo_area=stockholm`;

  // Make a request for a user with a given ID
axios.get(url)
  .then(function (response) {
    // handle success
    console.log(JSON.stringify(response.data));
    if(response.data.adverts)
      if(response.data.adverts.length>0) {
        const advert=response.data.adverts[0];
        bot.telegram.sendMessage(ctx.from.id, JSON.stringify(advert.companyInfo.companyName + "  "+advert.companyInfo.orgNumber, undefined, 2));
      }

  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
});

bot.action('delete', ({ deleteMessage }) => deleteMessage());
bot.launch();
