import { players } from '@prisma/client';
import { db, chatclient } from './index';

export async function pullRecord(uuid: string): Promise<players> {
    return new Promise(async (resolve) => {
        let record = await db.players.findFirst({ where: { uuid } });
        if (!record) {
            record = await db.players.create({ data: {
                uuid,
                credit: 1000,
                online_total: 0,
                online_afk: 0,
                online_latest: 0,
                chat_messages: 0,
                payments: 0,
            } });
        };
        resolve(record);
    });
};