import { ChatboxCommand } from 'switchchat/types/events/ChatboxCommand';
import SwitchChat from 'switchchat';
import { mode } from './formatmode';
import { db, chatclient } from './index';
import { pullRecord } from './recordpuller';
import { players } from '@prisma/client';

export default async function creditCommand(data: ChatboxCommand) {
    const record: players = await pullRecord(data.user.uuid);

    chatclient.tell(data.user.name, `&aCurrent social credit level: ${record.credit}`, '&e&lSocial Credit System', mode.format);
};