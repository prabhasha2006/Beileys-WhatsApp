const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys")
const pino = require("pino")
const { commands } = require('./command')
const { converaton } = require('./chat')
const { chatdata } = require('./chatdata')
let prefix = '.'
async function connectWa() {
    const auth = await useMultiFileAuthState(`session`)
    const EVELOCORE = makeWASocket({
        printQRInTerminal: true,
        browser: ['EveloCore', 'Safari', '1.0.0'],
        auth: auth.state,
        logger: pino({ level: "silent" })
    })
    EVELOCORE.ev.on("creds.update", auth.saveCreds)
    EVELOCORE.ev.on("connection.update", 
    ({ connection }) => {
        if(connection == "open") {
            console.log("\nAccount Connected.\n" , EVELOCORE.user)
            console.log('\nMade by EveloCore\n')
        }
        if(connection == "close") {
            connectWa()
        }
    })
    EVELOCORE.ev.on("messages.upsert", async({ messages }) => {
        messages.forEach(async(chat) => {
            //console.log(chat)
            if (chat.message) {
                var recieved = await chatdata(EVELOCORE, chat)
                console.log(recieved)
                // Check if command or message
                const cmd = recieved.text || ''
                if (cmd) {
                    function reply(text) {
                        EVELOCORE.sendMessage(chat.key.remoteJid, { text: text }, {quoted: chat})
                    }
                    if(cmd.startsWith(prefix)){
                        commands(EVELOCORE, recieved, chat, prefix)
                    }else{
                        converaton(EVELOCORE, recieved, chat)
                    }
                }
            }
        })
    })
    EVELOCORE.ev.on('group-participants.update', async (anu) => {
      //console.log(anu)
      try {
        let metadata = await EVELOCORE.groupMetadata(anu.id)
        let participants = anu.participants
        for (let num of participants) {
          try {
            ppuser = await EVELOCORE.profilePictureUrl(num, 'image')
          } catch (err) {
            ppuser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
          }
          try {
            ppgroup = await EVELOCORE.profilePictureUrl(anu.id, 'image')
          } catch (err) {
            ppgroup = 'https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png?q=60'
          }
          if (anu.action == 'add') {
            //add
          } else if (anu.action == 'remove') {
            //remove / left
          } else if (anu.action == 'promote') {
            //promote
          } else if (anu.action == 'demote') {
            //demote
          }
        }
      } catch (err) {
        console.log(err)
      }
    })
}

connectWa()