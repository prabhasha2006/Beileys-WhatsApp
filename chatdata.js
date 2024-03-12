const chatdata = async(EVELOCORE, chat) => {
    var data = {
        pushName: chat.pushName,
        remoteJid: chat.key.remoteJid,
        isGroup: chat.key.participant != undefined,
        groupParticipantJid: chat.key.participant || ''
    }
    var groupMetadata = data.isGroup ? await EVELOCORE.groupMetadata(data.remoteJid).catch(e => {}) : ''
    data = {
        pushName: chat.pushName,
        remoteJid: chat.key.remoteJid,
        fromMe: chat.key.fromMe,
        time: chat.messageTimestamp,
        text: chat.message.conversation || '',
        sticker: chat.message.stickerMessage || {},
        image: chat.message.imageMessage || {},
        isGroup: chat.key.participant != undefined,
        groupParticipantJid: chat.key.participant || '',
        groupName : data.isGroup ? groupMetadata.subject : '',
        groupDesc : data.isGroup ? groupMetadata.desc : '',
        groupAdmins : data.isGroup ? await groupMetadata.participants.filter(v => v.admin !== null).map(v => v.id) : '',
        groupOwner : data.isGroup ? groupMetadata.owner : '',
        groupMembers : data.isGroup ? groupMetadata.participants : '',
        //isBotAdmins : data.isGroup ? groupAdmins.includes(data.remoteJid) : false,
        isGroupAdmins : data.isGroup ? await groupMetadata.participants.filter(v => v.admin !== null).map(v => v.id).includes(data.groupParticipantJid) : false
    }
    return data
}
module.exports = {chatdata: chatdata}