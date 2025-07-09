import type { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import Valkey from 'iovalkey';
import { generateId } from './utils.ts';

const valkey =
  process.env.SELF_HOSTED_SHARE !== 'true'
    ? null
    : new Valkey(Number(process.env.VALKEY_PORT || 6379), process.env.VALKEY_HOST || 'valkey');

const getProject = async (req: ExpressRequest, res: ExpressResponse) => {
  if (!valkey) {
    res.status(400).send('Share service is disabled!');
    return;
  }

  const id = req.query.id;
  if (!id) {
    res.status(400).send('Bad Request!');
    return;
  }

  const value = await valkey.get(String(id).toLowerCase());
  if (!value) {
    res.status(404).send('Not Found!');
    return;
  }

  let content: any;
  try {
    content = JSON.parse(value);
  } catch {
    res.status(500).send('Server Error!');
    return;
  }

  res.status(200).json(content);
};

const saveProject = async (req: ExpressRequest, res: ExpressResponse) => {
  if (!valkey) {
    res.status(400).send('Share service is disabled!');
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed!');
    return;
  }

  const value = JSON.stringify(req.body);
  if (!value) {
    res.status(400).send('Bad Request!');
    return;
  }

  // note: dpaste id length: 9, API id length: 11, self-hosted id length: 14
  const idLength = 14;
  let id = generateId(idLength);
  // avoid collision
  while (await valkey.get(id)) {
    id = generateId(idLength);
  }

  await valkey.set(id, value);

  res.status(200).send(id);
};

export const share = (req: ExpressRequest, res: ExpressResponse) =>
  req.method === 'GET' ? getProject(req, res) : saveProject(req, res);
