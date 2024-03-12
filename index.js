const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys")
const pino = require("pino")
const { commands } = require('./command')
const { converaton } = require('./chat')
let message = ''
let command = ''
let prefix = '.'
async function connectWa() {
    const auth = await useMultiFileAuthState(`session`)
    const sock = makeWASocket({
        printQRInTerminal: true,
        browser: ['Local WhatsApp Bot', 'Safari', '1.0.0'],
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
        messages.forEach(chat => {
            var recieved = {
                pushName: chat.pushName,
                remoteJid: chat.key.remoteJid,
                fromMe: chat.key.fromMe,
                text: chat.message.conversation
            }
            console.log(recieved)
            if (chat.message) {
                const cmd = chat.message.conversation
                if (cmd) {
                    function reply(text) {
                        sock.sendMessage(chat.key.remoteJid, { text: text }, {quoted: chat})
                    }
                    if(cmd.startsWith(prefix)){
                        commands(sock, chat, prefix)
                    }else{
                        converaton(sock, chat)
                    }
                }
            }
        });
    })
}

connectWa()