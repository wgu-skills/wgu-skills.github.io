import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).send({ message: 'Only GET requests allowed' });
    return;
  }

  const { repoUrl } = req.query;

  if (typeof repoUrl !== 'string') {
    res.status(400).send({ message: 'repoUrl is required and must be a string' });
    return;
  }

  const repoPath = new URL(repoUrl).pathname.slice(1); // remove leading '/'
  const [owner, name] = repoPath.split('/');

  const query = `
    query {
      repository(owner: "${owner}", name: "${name}") {
        name
        description
        object(expression: "HEAD:") {
          ... on Tree {
            entries {
              name
              type
            }
          }
        }
        openGraphImageUrl
      }
    }
  `;

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    res.status(200).json(data.data.repository);
  } catch (error) {
    console.error('Error fetching GitHub repo data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
