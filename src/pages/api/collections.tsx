import osmtCollections from './osmtCollections';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function collections(req: NextApiRequest, res: NextApiResponse)  {
  console.log(req)
  try {

    res.status(200).json(osmtCollections);
  } catch (error) {
    console.error('Fetching error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

