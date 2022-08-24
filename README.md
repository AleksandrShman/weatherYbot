# WeatherYaBot
Server
## Как начать работу
1.  Переходим в папку Server
1.  Создать файл `app.js` для входа в приложение.
```Javascript
require('dotenv').config()
const express = require('express')
const { Telegraf } = require('telegraf')
const fetch = require('node-fetch')
```

1.  В терминале(bash) пишем команды:
```bash
1. `npm init -y` - инициализируем проект node
1. `npm i express telegraf node-fetch dotenv` - устанавливаем необходимые модули
1. 'npx eslint --init' - устанавливаем eslint
```

## Что еще необходимо сделать

1.  Создать файл .env 
1.  Копируем ключи из файла .env copy 
```.env
PORT=
MY_TELEGRAM_BOT_TOKEN=
CHAT_ID=
GEOCODER_KEY=
WEATHER_KEY_TEST=
# WEATHER_KEY=
``` 

## Переходим в Яндекс Кабинет разработчика
https://developer.tech.yandex.ru/services/

1.  Создаем кабинет в Геокодере, забираем ключи, подставляем значения
1.  Создаем кабинет в API Яндекс.Погоды, забираем ключи, подставляем значения

## В Телеграм

1.  Находим @BotFather запускаем команду /newbot
1.  В следующем сообщением придумываем имя бота, важно, чтобы на конце было "_bot" или "bot"
1.  Получаем ключ(token), подставляем значения
1.  Дополнительную информацию по Telegraf можно найти в докуменации https://telegraf.js.org/
1.  Дополнительную информацию по Telegram я находил в просторах интренета и в докуменации https://telegram.org/


## Запускаем приложение 

1.  Проверяем что мы находимя в нужной директории. 
1.  В терминале(bash) пишем команды:
```bash
`node app.js` - запускаем приложение.
```
Но более правильным будет 
1.  Находим в package.json свойство(строку) "scripts"
```json
`"scripts": {
    "dev": "nodemon app.js",
    
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```
1.  Проверяем наличие строки, при необходимости добавляем.
```json
'"start": "node app.js",'
```
1. Результат должен будет таким:
```json
"scripts": {
    "dev": "nodemon app.js",
    "start": "node app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```
1. Запускаем
```bash
'npm start'
```
