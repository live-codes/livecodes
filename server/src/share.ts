import type { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import Valkey from 'iovalkey';
import { generateId } from './utils.ts';

const valkey = new Valkey(
  Number(process.env.VALKEY_PORT || 6379),
  process.env.VALKEY_HOST || 'valkey',
);

const getProject = async (req: ExpressRequest, res: ExpressResponse) => {
  const id = req.query.id;
  if (!id) {
    res.status(400).send('Bad Request!');
    return;
  }

  const value = await valkey.get(String(id));
  if (!value) {
    res.status(404).send('Not Found!');
    return;
  }

  let content: any;
  try {
    content = JSON.parse(value);
  } catch (error) {
    res.status(500).send('Server Error!');
    return;
  }

  res.status(200).json(content);
};

const saveProject = async (req: ExpressRequest, res: ExpressResponse) => {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed!');
    return;
  }

  const value = JSON.stringify(req.body);
  if (!value) {
    res.status(400).send('Bad Request!');
    return;
  }

  let id = generateId();
  // avoid collision
  while (await valkey.get(id)) {
    id = generateId();
  }

  await valkey.set(id, value);

  res.status(200).send(id);
};

export const share = (req: ExpressRequest, res: ExpressResponse) =>
  req.method === 'GET' ? getProject(req, res) : saveProject(req, res);
