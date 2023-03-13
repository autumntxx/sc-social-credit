import { players } from '@prisma/client';
import { db, chatclient } from './index';
import { pullRecord } from './recordpuller';

chatclient.on('chat_ingame', async (message) => {
    const record: players = await pullRecord(message.user.uuid);

    db.players.update({
        where: {
            uuid: message.user.uuid,
        },
        data: {
            chat_messages: record.chat_messages + 1,
        },
    });
});