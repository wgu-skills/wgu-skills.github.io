// pages/api/collection/[uuid].tsx

import { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { owner, name } = req.query // Destructure the query string variables

  if (!owner || !name) {
    res.status(400).json({ message: 'Invalid GitHub repository URL' })
    return
  }

  const query = `
    {
      repository(owner: "${owner}", name: "${name}") {
        name
        nameWithOwner
        description
        createdAt
        updatedAt
        pushedAt
        archivedAt
        url
        openGraphImageUrl
        usesCustomOpenGraphImage
        object(expression: "main:collection.skill.json") {
          ... on Blob {
            text
          }
        }
      }
    }
  `

  const githubApiUrl = 'https://api.github.com/graphql'
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN // Ensure you have a GitHub token set in your environment variables
  
  try {
    const response = await fetch(githubApiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    })

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`)
    }

    const data = await response.json()
    if (data.errors) {
      throw new Error(
        `Error in GraphQL query: ${data.errors
          .map((error: { message: any }) => error.message)
          .join(', ')}`,
      )
    }

    res.status(200).json(data.data.repository)
  } catch (error) {
    console.error('Fetching error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
