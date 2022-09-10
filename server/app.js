require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { Telegraf } = require('telegraf')
const fetch = require('node-fetch')

const app = express()

const morgan = require('morgan')

const PORT = process.env.PORT ?? 3000
const telegramBotKey = process.env.MY_TELEGRAM_BOT_TOKEN
const geocoderKey = process.env.GEOCODER_KEY
const weatherKey = process.env.WEATHER_KEY
// const HOST = process.env.HOST || "127.0.0.1";
// const weatherKeyTest = process.env.WEATHER_KEY_TEST
// const telegramChatId = process.env.CHAT_ID

app.use(morgan('dev'))

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', function (req, res) {
  const data = list;
  res.send(JSON.stringify(data));
});

let list = []
console.log(list);
// const exampleApiGeocoderYaJSON = `'https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${geocoderKey}&geocode=${data}`
// const exampleApiWeatherYaJson = 'https://api.weather.yandex.ru/v2/informers?lat=55.75396&lon=76.102621'
// нужный объект координат: data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos

// //Подключение Telegraf.
const bot = new Telegraf(telegramBotKey)

bot.start((ctx) =>
  ctx.reply(`
   Привет ${ctx.from.first_name}! Это сырая, но уже рабочая версия показа погоды.
    Напиши интерсующий город и я покажу температуру в этом городе или улице города. `)
)
bot.on('text', async (ctx) => {
  try {
    const botUserText = ctx.message.text
    head(ctx.message.text),
      console.log(botUserText, 'telegramBotRequest')
    // // цепочка запросов -> 1. Запрос координат
    async function head(data) {
      try {
        return await fetch('https://geocode-maps.yandex.ru/1.x/?format=json&apikey=' + geocoderKey + '&geocode=' + data)
          .then(response => response.json())
          .then(GeoData => answerGeoCoder(GeoData))
          .catch((error) => console.log(error))
      } 
      catch (err) {  
        console.err(err);
      }
    }
    // // цепочка запросов -> 2. Запрос координат( для основного тарифного плана)
    async function answerGeoCoder(data) { // для тарифа "Основной прогноз погоды"
      try {
      return await fetch('https://api.weather.yandex.ru/v2/informers?lang=ru_RU&' + 'lat=' + data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.slice(10, 18) + '&lon=' + data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.slice(0, 9), {
        method: "GET",
        body: JSON.stringify(),
        headers: { "X-Yandex-API-Key": `${weatherKey}` }
      })

    // // цепочка запросов -> 2. Запрос погоды по координатам(тариф тестовый).
    // async function answerGeoCoder(data) {
    //   try {
    //     return await fetch('https://api.weather.yandex.ru/v2/forecast?lang=ru_RU&' + 'lat=' + data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.slice(10, 18) + '&lon=' + data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.slice(0, 9), {
    //       method: "GET",
    //       body: JSON.stringify(),
    //       headers: { "X-Yandex-API-Key": `${weatherKeyTest}` }
    //     })

          .then(response => response.json())
          // ответ в telegram
          .then((response) => ctx.reply(`${ctx.from.first_name}, Для города ${ctx.message.text}. Температура сейчас ${response.fact.temp} градусов`))
          // отслеживание запросов
          .then((res) => {
            list = [
              {
                id: Date.now(),
                name: ctx.from.first_name,
                message: ctx.message.text,
                temperatura: res.text
              },
            ];

            console.log(res)

          })

          .catch((error) => console.log(error))
      } catch (err) {
        console.err(err);
      }
    }
  } catch (e) {
    ctx.reply(
      'Такого города не существует, или не правильный запрос. Повтори запрос.'
    )
  }
})
bot.launch()
// // Methods Telegraf основные
// bot.start((ctx) => ctx.reply('Привет, приступим?'))
// bot.command('old', (ctx) => ctx.reply('Hello'))
// bot.help((ctx) => ctx.reply('Send me a sticker'))

// bot.on('text', (ctx) => ctx.reply('👍'))
// bot.hears('hi', (ctx) => ctx.reply('Hey there'))
// bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

// // // Methods 'Telegram bot API'
// // 1. getUpdates
// fetch(`https://api.telegram.org/bot${telegramBotKey}/getUpdates`)
//  .then(response => response.json())
// .then(data => console.log(data))

// // 2. sendMessage
// `https://api.telegram.org/bot${telegramBotKey}/sendMessage?chat_id=${telegramChatId}&text=Hello%20World`

console.log(list);

app.listen(PORT, () => {
  console.log(`server started на ${PORT} Порту`)
})
