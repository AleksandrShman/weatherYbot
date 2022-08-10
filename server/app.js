require("dotenv").config();
const express = require('express')
const cors = require("cors");
const { Telegraf } = require('telegraf')
const fetch = require('node-fetch')

const app = express()

const morgan = require('morgan')

const PORT = process.env.PORT ?? 3000;
const telegramBotKey = process.env.MY_TELEGRAM_BOT_TOKEN;
const telegramChatId = process.env.CHAT_ID
const geocoderKey = process.env.GEOCODER_KEY
const weatherKey = process.env.WEATHER_KEY

app.use(morgan('dev'))

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const exampleApiGeocoderYaJSON = `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${geocoderKey}&geocode=Москва, улица Новый Арбат, дом 24`
const exampleApiWeatherYaJson = 'https://api.weather.yandex.ru/v2/informers?lat=55.75396&lon=37.620393'

fetch(exampleApiWeatherYaJson, {
 method: "GET",
 body: JSON.stringify(),
 headers: { "X-Yandex-API-Key": `${weatherKey}` }
})
 .then(response => response.json())
 .then(data => console.log(data))


// // // Methods Telegraf
// const bot = new Telegraf(telegramBotKey)
// bot.start((ctx) => ctx.reply('Привет, приступим?'))
// bot.command('old', (ctx) => ctx.reply('Hello'))
// bot.help((ctx) => ctx.reply('Send me a sticker'))

// bot.on('sticker', (ctx) => ctx.reply('👍'))
// bot.hears('hi', (ctx) => ctx.reply('Hey there'))
// bot.launch()

// // Enable graceful stop
// process.once('SIGINT', () => bot.stop('SIGINT'))
// process.once('SIGTERM', () => bot.stop('SIGTERM'))


// // // Methods 'Telegram bot API'
// // 1. getUpdates 
// fetch(`https://api.telegram.org/bot${telegramBotKey}/getUpdates`)
//  .then(response => response.json())
// .then(data => console.log(data))

// // 2. sendMessage
// `https://api.telegram.org/bot${telegramBotKey}/sendMessage?chat_id=${telegramChatId}&text=Hello%20World`

app.listen(PORT, () => {
 console.log(`server started на ${PORT} Порту`)
})
