import { players } from '@prisma/client';
import axios from 'axios';
import * as express from 'express';
import { pullRecord } from './recordpuller';
import { NextFunction, Response, Request } from 'express';

const app = express();

async function loadPlayerUUID(req: Request, res: Response, next: NextFunction) {
    try {
        if (!req.query.ign) throw new Error();
        const uuid = (await (await axios.get(`https://api.mojang.com/users/profiles/minecraft/${req.query.ign}`)).data).id;
        res.locals.uuid = require('add-dashes-to-uuid')(uuid);
        next();
    } catch (err) {
        res.status(400).send('Player not found!');
    };
};

app.get('/checkCredit', loadPlayerUUID, async (req, res) => {
    const record: players = await pullRecord(res.locals.uuid);
    res.send(record.credit.toString());
});

app.listen(3000, () => console.log('API started!'));