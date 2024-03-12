const commands = (EVELOCORE, recieved, chat, prefix) => {
    let cmd = recieved.text
    let message = ''
    let sender = recieved.remoteJid
    if(cmd.startsWith(prefix)){
        message = cmd.replace(prefix,'')
        var breakWords = message.split(' ')
        cmd = breakWords[0]
        message = message.replace(cmd+' ', '')
    }
    function reply(text) {
        EVELOCORE.sendMessage(sender, { text: text }, {quoted: chat})
    }
    switch(cmd){
        case 'start': {
            reply('fuck you...')
        }
        case 'yt': {
            reply(message)
        }
    }
}
module.exports = {commands: commands}