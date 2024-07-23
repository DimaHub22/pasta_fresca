const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')

const TelegramBot = require('node-telegram-bot-api');
const token = keys.tokenBot;
const bot = new TelegramBot(token, {polling: true, autoStart: true});

const chatId = keys.chatId;


module.exports.send = async function (req, res) {
    try {
        if (req.body) {
            let time = new Date()
            let message = ` Дата: ${time.toLocaleString()}\n`;

            message += `Имя: ${req.body.name}\n`
            message += `Email: ${req.body.email}\n`
            message += `Комментарий: ${req.body.comment}\n`
            message += `Рейтинг: ${req.body.rating}\n`

            bot.sendMessage(chatId, message)
        }
        res.status(200).json({
            message: "Отзыв отправлен"
        })

    } catch (e) {
        errorHandler(res, e)
    }
}