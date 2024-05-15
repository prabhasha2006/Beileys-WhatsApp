/*
 * Beileys sample project
 * Copyright 2024 Evelocore
 * evelocore@gmail.com
 * github.com/prabhasha2006
 * t.me/kumuthu
 * https://evelocore.com
 */
//const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");
const commands = async (EVELOCORE, recieved, chat, prefix) => {
    let cmd = recieved.text
    let message = ''
    let sender = recieved.remoteJid
    var quoted = chat.quoted ? chat.quoted : chat
    var mime = (quoted.msg || quoted).mimetype || ''
    quoted.download = () => EVELOCORE.downloadMediaMessage(quoted)
    if(cmd.startsWith(prefix)){
        message = cmd.replace(prefix,'')
        var breakWords = message.split(' ')
        cmd = breakWords[0]
        message = message.replace(cmd+' ', '')
    }
    function reply(text) {
        EVELOCORE.sendMessage(sender, { text: text }, {quoted: chat})
    }
    try {
        switch(cmd){
            case 'start': {
                reply('Hi, Evelocore is here...\nCreated by K.Prabhasha')
            }
            /* case 'sticker': case 's': {
                var pack = "Evelocore"
                var author = "Sticker Maker Bot"
                EVELOCORE.sendMessage(sender, { react: { text: '🌀', key: chat.key }})
                if (!quoted){ reply('Please reply a photo/video or gif and send')}else{
                    reply('👀 Here is your sticker 👇🏻')
                    let media = await quoted.download()
                    let sticker = new Sticker(media, {
                        pack: pack, // The pack name
                        author: author, // The author name
                        type: text.includes("--crop" || '-c') ? StickerTypes.CROPPED : StickerTypes.FULL,
                        categories: ["❤️", "😂"], // The sticker category
                        id: "12345", // The sticker id
                        quality: 75, // The quality of the output file
                        background: "transparent", // The sticker background color (only for full stickers)
                    });
                    const buffer = await sticker.toBuffer();
                    return EVELOCORE.sendMessage(sender, {sticker: buffer}, {quoted: chat });
                }
                if (/image/.test(mime)) {
                    let media = await quoted.download()
                    let sticker = new Sticker(media, {
                        pack: pack, // The pack name
                        author: author, // The author name
                        type: text.includes("--crop" || '-c') ? StickerTypes.CROPPED : StickerTypes.FULL,
                        categories: ["❤️", "😂"], // The sticker category
                        id: "12345", // The sticker id
                        quality: 75, // The quality of the output file
                        background: "transparent", // The sticker background color (only for full stickers)
                    })
                    const buffer = await sticker.toBuffer()
                    return EVELOCORE.sendMessage(sender, {sticker: buffer}, {quoted: chat });
                } else if (/video/.test(mime)) {
                    if((quoted.msg || quoted).seconds > 11) return reply('Please reply a photo/video or gif and send .sticker to contert it to sticker.')
                    let media = await quoted.download()
                    let sticker = new Sticker(media, {
                        pack: pack, // The pack name
                        author: author, // The author name
                        type: StickerTypes.FULL, // The sticker type
                        categories: ["❤️", "😂"], // The sticker category
                        id: "12345", // The sticker id
                        quality: 70, // The quality of the output file
                        background: "transparent", // The sticker background color (only for full stickers)
                    });
                    const stikk = await sticker.toBuffer()
                    return EVELOCORE.sendMessage(sender, { sticker: stikk }, { quoted: chat });
                } else {
                    reply('Please reply a photo/video or gif and send .sticker to contert it to sticker.')
                }
            } */
        }
    } catch (error) {
        console.log(error)
    }
}
module.exports = {commands: commands}