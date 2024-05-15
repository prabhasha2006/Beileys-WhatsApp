/*
 * Beileys sample project
 * Copyright 2024 Evelocore
 * evelocore@gmail.com
 * github.com/prabhasha2006
 * t.me/kumuthu
 * https://evelocore.com
 */
const chat = (EVELOCORE, recieved, chat) => {
    let message = recieved.text
    let sender = recieved.remoteJid
    function reply(text) {
        console.log(text)
        EVELOCORE.sendMessage(sender, { text: text }, {quoted: chat})
    }
    /* if(message.match(/hi/gi)){
        reply('hi ai moko')
    } */
    if(message.match(/suba|aluth|සුබ|සුභ/gi)){
        reply('Esema wewa')
    }
}
module.exports = {converaton: chat}