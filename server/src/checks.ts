import { db, chatclient } from './index';
import { players } from '@prisma/client';
import { pullRecord } from './recordpuller';
import axios from 'axios';

let lastDynmap: { players: any[]; };

(async () => {
    lastDynmap = await (await axios.get(`https://dynmap.sc3.io/up/world/SwitchCraft/${Date.now()}`)).data;
})();

interface dynmapinfo {
    world: string;
    name: string;
    x: number;
    y: number;
    z: number;
    account: string;
};

setInterval(async () => {
    const currentDynmap = await (await axios.get(`https://dynmap.sc3.io/up/world/SwitchCraft/${Date.now()}`)).data;

    chatclient.players.forEach(async (player) => {
        try {
            const info1: dynmapinfo = currentDynmap.players.find((splayer: { name: string; }) => splayer.name == player.name);
            const info2: dynmapinfo = lastDynmap.players.find((splayer: { name: string; }) => splayer.name == player.name);

            const playerMoveDistance = Math.sqrt((info2.x - info1.x) * (info2.x - info1.x) + (info2.y - info1.y) * (info2.y - info1.y) + (info2.z - info1.z) * (info2.z - info1.z));

            const record: players = await pullRecord(player.uuid);
            
            if (record.online_total < 30) {
                await db.players.update({
                    where: {
                        uuid: player.uuid,
                    },
                    data: {
                        online_total: record.online_total + 1,
                        online_afk: record.online_afk + ((playerMoveDistance <= 5) ? 1 : 0),
                        online_latest: Math.floor(Date.now() / 1000),
                    },
                });
            } else {
                await db.players.update({
                    where: {
                        uuid: player.uuid,
                    },
                    data: {
                        online_total: 0,
                        online_afk: 0,
                        chat_messages: 0,
                        credit: record.credit + ((record.online_afk / record.online_total < .5) ? 1 : -1) + ((record.chat_messages >= 6) ? 2 : -2),
                        online_latest: Math.floor(Date.now() / 1000),
                    },
                });
            };
        } catch (err) {};
    });

    setTimeout(async () => {
        lastDynmap = currentDynmap;
    }, 50000);
}, 60000);