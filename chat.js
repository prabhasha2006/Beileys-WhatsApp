const chat = (sock, chat) => {
    let message = chat.message.conversation
    let sender = chat.key.remoteJid
    function reply(text) {
        console.log(text)
        sock.sendMessage(sender, { text: text }, {quoted: chat})
    }
    if(message.match(/hi/gi)){
        reply('Ubata moko huththooooooooooo.........')
    }
}
module.exports = {converaton: chat}