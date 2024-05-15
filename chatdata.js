/*
 * Beileys sample project
 * Copyright 2024 Evelocore
 * evelocore@gmail.com
 * github.com/prabhasha2006
 * t.me/kumuthu
 * https://evelocore.com
 */
const chatdata = async(EVELOCORE, chat) => {
    try {
        var data = {
            pushName: chat.pushName,
            remoteJid: chat.key.remoteJid,
            isGroup: chat.key.participant != undefined,
            groupParticipantJid: chat.key.participant || '',
            extended: chat.message.extendedTextMessage || {}
        }
        var groupMetadata = data.isGroup ? await EVELOCORE.groupMetadata(data.remoteJid).catch(e => {console.log(e)}) : ''
        //console.log(groupMetadata)
        data = {
            pushName: chat.pushName || '',
            remoteJid: chat.key.remoteJid,
            fromMe: chat.key.fromMe,
            time: chat.messageTimestamp,
            text: data.extended.text ? data.extended.text || '' : chat.message.conversation || '',
            sticker: chat.message.stickerMessage || {},
            image: chat.message.imageMessage || {},
            video: chat.message.videoMessage || {},
            extended: data.extended || {},
            isGroup: chat.key.participant != undefined,
            groupParticipantJid: chat.key.participant || '',
            groupName : data.isGroup ? groupMetadata.subject || '' : '',
            groupDesc : data.isGroup ? groupMetadata.desc || '' : '',
            groupSize : data.isGroup ? groupMetadata.size || 0 : 0,
            groupAdmins : data.isGroup ? await groupMetadata.participants.filter(v => v.admin !== null).map(v => v.id) || [] : '',
            groupOwner : data.isGroup ? groupMetadata.owner || '' : '',
            groupMembers : data.isGroup ? groupMetadata.participants || [] : '',
            //isBotAdmins : data.isGroup ? groupAdmins.includes(data.remoteJid) : false,
            isGroupAdmins : data.isGroup ? await groupMetadata.participants.filter(v => v.admin !== null).map(v => v.id).includes(data.groupParticipantJid) : false
        }
        return data
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    chatdata: chatdata,
    smsg: smsg
}