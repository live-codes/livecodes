/* eslint-disable import/order */
import cors from 'cors';
import express from 'express';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import * as socketio from 'socket.io';
import { dirname, generateId } from '../utils.ts';

export const broadcast = ({
  hostname,
  port,
  appUrl,
  userTokens,
}: {
  hostname: string;
  port: number;
  appUrl: string;
  userTokens: string;
}) => {
  const app = express();
  const httpserver = http.createServer(app);
  const io = new socketio.Server(httpserver);

  const channels = {};
  const broadcastDir = path.resolve(dirname, 'broadcast');
  const broadcastUrl = `https://${hostname}:${port}`;

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.disable('x-powered-by');

  app.use((_req, res, next) => {
    res.on('finish', () => {
      Object.keys(channels).forEach((key) => {
        const timeout = 1000 * 60 * 20;
        if (Date.now() - channels[key].lastAccessed > timeout) {
          delete channels[key];
        }
      });
    });
    next();
  });

  const hasPermission = (req: express.Request) => {
    if (!userTokens.trim()) return true;
    const userToken = req.body.userToken || req.query.userToken || req.query.token;
    if (!userToken) return false;
    const validTokens = userTokens.split(',').map((t) => t.trim());
    return validTokens.includes(userToken);
  };

  app.get('/', (_req, res) => {
    res.sendFile(path.join(broadcastDir, `/index.html`));
  });

  app.post('/', (req, res) => {
    if (!hasPermission(req)) {
      res.status(401).json({ error: 'Permission denied! Invalid user token.' });
      return;
    }
    const newChannel = !req.body.channel;
    const channel = newChannel ? generateId() : req.body.channel;
    const result = req.body.result;
    const data = req.body.data;
    const stopBroadcast = req.body.stop;

    if (!newChannel && !channels[channel]) {
      res.status(404).json({ error: 'Channel not found!' });
      return;
    }
    if (!newChannel && req.body.channelToken !== channels[channel].channelToken) {
      res.status(401).json({ error: 'Permission denied! Invalid channel token.' });
      return;
    }
    if (!newChannel && channels[channel] && stopBroadcast) {
      delete channels[channel];
      io.in(channel).disconnectSockets(true);
      res.json({ message: 'Broadcast stopped!' });
      return;
    }

    io.in(channel).emit('receive', result, data);

    const channelToken = newChannel ? generateId() : channels[channel].channelToken;

    const reducedData = JSON.parse(JSON.stringify(data || {}));
    if (reducedData.markup) reducedData.markup.compiled = '';
    if (reducedData.style) reducedData.style.compiled = '';
    if (reducedData.script) reducedData.script.compiled = '';
    reducedData.files?.forEach?.((f: any) => (f.compiled = ''));

    channels[channel] = {
      channelToken,
      result: result.length < 300000 ? result : '',
      data: JSON.stringify(reducedData).length < 500000 ? reducedData : {},
      lastAccessed: Date.now(),
    };

    const channelUrl = `${broadcastUrl}/channels/${channel}`;

    res.json({
      channel,
      channelUrl,
      ...(newChannel ? { channelToken } : {}),
    });
  });

  app.get('/channels/:id', async (req, res) => {
    const channel = req.params.id;
    if (channels[channel]) {
      channels[channel].lastAccessed = Date.now();
      const hasData = Object.keys(channels[channel].data || {}).length > 0;
      const views = ['index', 'code', 'result'] as const;
      const view = req.query.view;
      const file = views.find((v) => v === view) || (hasData ? 'index' : 'result');
      const fileContent = (
        await fs.promises.readFile(path.join(broadcastDir, `/${file}.html`), 'utf-8')
      ).replaceAll('{{AppUrl}}', appUrl);
      res.status(200).send(fileContent);
    } else {
      res.status(404).send('Channel not found!');
    }
  });

  io.on('connection', (socket) => {
    socket.on('join', (channel) => {
      if (!channels[channel]) return;
      socket.join(channel);
      const { result = '', data = {} } = channels[channel];
      socket.emit('receive', result, data);
    });
  });

  httpserver.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Broadcast is running on https://${hostname}${port !== 443 ? ':' + port : ''}`);
  });
};
