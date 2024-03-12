const commands = (sock, chat, prefix) => {
    let cmd = chat.message.conversation
    let message = ''
    let sender = chat.key.remoteJid
    if(cmd.startsWith(prefix)){
        message = cmd.replace(prefix,'')
        var breakWords = message.split(' ')
        cmd = breakWords[0]
        message = message.replace(cmd+' ', '')
    }
    function reply(text) {
        sock.sendMessage(sender, { text: text }, {quoted: chat})
    }
    switch(cmd){
        case 'start': {
            reply('fuck you...')
        }
    }
}
module.exports = {commands: commands}