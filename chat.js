const chat = (EVELOCORE, recieved, chat) => {
    let message = recieved.text
    let sender = recieved.remoteJid
    function reply(text) {
        console.log(text)
        EVELOCORE.sendMessage(sender, { text: text }, {quoted: chat})
    }
    if(message.match(/hi/gi)){
        reply('hi ai moko')
    }
}
module.exports = {converaton: chat}