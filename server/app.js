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


const userText = 'Санкт-Петербург' // город по дефолту

const exampleApiGeocoderYaJSON = `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${geocoderKey}&geocode=${userText}`
const exampleApiWeatherYaJson = `https://api.weather.yandex.ru/v2/informers?lat=30.012400&lon=46.643343`


// Отлавливаем город и отдаем координаты через Геокодер
// нужный объект координат: data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos

// fetch и функция на поиски широты
fetch(exampleApiGeocoderYaJSON, {
})
 .then(response => response.json())
 .then(GeodataLat => answerGeoCoderLat(GeodataLat))
async function answerGeoCoderLat(data) {
 return (data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.slice(0, 9))
}

// fetch и функция на поиски долготы
fetch(exampleApiGeocoderYaJSON, {
})
 .then(response => response.json())
 .then(GeoDataLon => answerGeoCoderLon(GeoDataLon))
async function answerGeoCoderLon(data) {
 return (data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.slice(10, 19))
}

// Отлавливаем погоду по введенным координатам
fetch(exampleApiWeatherYaJson, {
 method: "GET",
 body: JSON.stringify(),
 headers: { "X-Yandex-API-Key": `${weatherKey}` }
})
 .then(response => response.json())
 .then(dataWeather => console.log(dataWeather))



// Подключение Telegraf и его тело.
// const bot = new Telegraf(telegramBotKey)

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

// // // Methods Telegraf
// bot.start((ctx) => ctx.reply('Привет, приступим?'))
// bot.command('old', (ctx) => ctx.reply('Hello'))
// bot.help((ctx) => ctx.reply('Send me a sticker'))

// bot.on('sticker', (ctx) => ctx.reply('👍'))
// bot.hears('hi', (ctx) => ctx.reply('Hey there'))
// bot.launch()

// Enable graceful stop
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
