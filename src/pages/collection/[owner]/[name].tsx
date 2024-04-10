import Link from 'next/link'
import { GetServerSideProps, NextPage } from 'next'
import kebabToTitleCase from '@/lib/kebabToTitleCase'
import GithubIcon from '@/components/icons/GithubIcon'
import SkillsList from '@/components/SkillsList'

// Define props type
interface CollectionPageProps {
  collectionData: any // Replace 'any' with a more specific type for your data
}

const CollectionPage: NextPage<CollectionPageProps> = ({ collectionData }) => {
  // You can use the collectionData fetched from your server here
  return (
    <div className="mx-auto flex flex-col space-y-5 py-32 lg:w-2/3">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
        {kebabToTitleCase(collectionData.name)}
      </h1>
      <p>{collectionData.description}</p>

    <div className="flex flex-row space-x-4">
      <Link
        href={collectionData.url}
        aria-label="GitHub"
        className="inline-flex w-60 items-center justify-center space-x-3 rounded border border-white bg-slate-900 p-3 text-white shadow-sm"
      >
        <GithubIcon />
        <span>Github</span>
      </Link>
      <button
        className="inline-flex items-center justify-center space-x-3 rounded border border-white bg-slate-900 p-3 text-white shadow-sm"
        onClick={() => {
          alert('Coming soon!')
        }}>
          npm i @wgu/{collectionData.name}
        </button>
        </div>

        <SkillsList skills={collectionData.skills} />
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
