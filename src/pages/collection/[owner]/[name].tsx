import Link from 'next/link'
import { GetServerSideProps, NextPage } from 'next'
import kebabToTitleCase from '@/lib/kebabToTitleCase'
import GithubIcon from '@/components/icons/GithubIcon'
// Define props type
interface CollectionPageProps {
  collectionData: any // Replace 'any' with a more specific type for your data
}

const CollectionPage: NextPage<CollectionPageProps> = ({ collectionData }) => {
  // You can use the collectionData fetched from your server here
  return (
    <div className="mx-auto flex flex-col space-y-5 py-32 lg:w-2/3">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        {kebabToTitleCase(collectionData.name)}
      </h1>
      <p>{collectionData.description}</p>

      <Link
        href={collectionData.url}
        aria-label="GitHub"
        className="inline-flex w-42 items-center justify-center space-x-3 rounded bg-wguBlue p-3 text-white shadow-sm"
      >
        <GithubIcon mode="dark"/>
        <span>Github</span>
      </Link>
    </div>
  )
}

// Fetch data on the server side
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { owner, name } = context.query

  const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL
  let collectionData = null

  // Fetch data using the owner and name
  try {
    const response = await fetch(
      `${NEXT_PUBLIC_API_URL}/api/collection?owner=${owner}&name=${name}`,
    )
    collectionData = await response.json()
  } catch (error) {
    console.error('Error fetching collection data:', error)
    // Handle errors as needed
  }

  return {
    props: {
      collectionData, // This data will be passed to the page component as props
    },
  }
}

export default CollectionPage
