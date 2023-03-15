import { PrismaClient } from '@prisma/client';
import { Client } from 'switchchat';
import { ChatboxCommand } from 'switchchat/types/events/ChatboxCommand';
import creditCommand from './creditcommand';

export const db = new PrismaClient();
export const chatclient = new Client(process.env.sctoken);

import './checks';
import './chatlogger';
import './api';

chatclient.on('command', async (data: ChatboxCommand) => {
    if (data.command == 'credit' || data.command == 'socialcredit') {
        creditCommand(data);
    };
});

chatclient.on('ready', async () => {
    console.log(`Server Started! Logged in as ${chatclient.owner}'s chatbox.`);
});

chatclient.connect();
