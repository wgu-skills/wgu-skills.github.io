import osmtCollections from './osmtCollections'
import { NextApiRequest, NextApiResponse } from 'next'

/**
 * Handler function for the collections API endpoint.
 * @param {NextApiRequest} req - The incoming request object.
 * @param {NextApiResponse} res - The response object used to send data back to the client.
 * @returns {Promise<void>} - A Promise that resolves when the API call is complete.
 */
export default async function collections(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log(req)
  try {
    res.status(200).json(osmtCollections)
  } catch (error) {
    console.error('Fetching error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
