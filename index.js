const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys")
const pino = require("pino")
let message = ''
let command = ''
async function connectWa() {
    const auth = await useMultiFileAuthState(`session`)
    const sock = makeWASocket({
        printQRInTerminal: true,
        browser: ['Basic WhatsApp Bot', 'Safari', '1.0.0'],
        auth: auth.state,
        logger: pino({ level: "silent" })
    })

    sock.ev.on("creds.update", auth.saveCreds)
    sock.ev.on("connection.update", 
    ({ connection }) => {
        if(connection == "open") {
            console.log("Basic WhatsApp Bot Connected..")
        }
        if(connection == "close") {
            connectWa()
        }
    })

    sock.ev.on("messages.upsert", ({ messages }) => {
        const chat = messages[0]
        const cmd = chat.message.conversation
        function reply(text) {
            sock.sendMessage(chat.key.remoteJid, { text: text }, {quoted: chat})
        }
    const prefix = '.'
    if(cmd.startsWith(prefix)){
        message = cmd.replace(prefix,'')
        var breakWords = message.split(' ')
        command = breakWords[0]
        message = message.replace(command+' ', '')
        console.log(command)
        console.log(message)
        if(cmd.match('ping')) {
            reply("pong!!")
            return
        }
        if(cmd === 'bot') {
            reply("Basic Whatsapp Bot")
            return
        }
    }
    switch(cmd) {
        case 'menu': {
            reply("Hello i' am Basic Whatsapp bot")
            break
        }

        default:
    }
    })
}

connectWa()