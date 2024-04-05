// pages/api/collection/[uuid].tsx

import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';
import { validate } from 'uuid';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { uuid } = req.query;

  if (!validate(uuid as string)) {
    res.status(400).json({ message: 'Invalid UUID' });
    return;
  }

  const externalApiUrl = `https://aa-skill.wgu.edu/api/collections/${uuid}`;

  try {
    const response = await fetch(externalApiUrl);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Fetching error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
