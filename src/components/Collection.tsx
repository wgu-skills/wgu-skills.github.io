import Link from 'next/link'
import React, { useEffect, useState } from 'react'

interface CollectionProps {
  url: string
}

function kebabToTitleCase(str) {
  return str
    .split('-') // Split the string by hyphens
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(' ') // Join the words back with spaces
}

const fetchRepo = async (
  url: string,
  setRepo: React.Dispatch<React.SetStateAction<any>>,
) => {
  const repoPath = new URL(url).pathname.slice(1)
  const [owner, name] = repoPath.split('/')
  const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL

  try {
    const response = await fetch(
      `${NEXT_PUBLIC_API_URL}/api/collection?owner=${owner}&name=${name}`,
      {
        cache: 'force-cache', // or use 'default' if you prefer
      },
    )
    if (!response.ok) throw new Error('Failed to fetch repo')

    let repoData = await response.json()
    setRepo(repoData)
  } catch (error) {
    console.error('Error fetching repository:', error)
  }
}

const Collection: React.FC<CollectionProps> = ({ url }) => {
  const [repo, setRepo] = useState(null)

  useEffect(() => {
    fetchRepo(url, setRepo)
  }, [url, setRepo]) // Add setRepo to dependency array

  return (
    <Link
      href={repo ? `/collections/${repo.owner.login}/${repo.name}` : '#'}
      className="FeatureCard inline-flex h-24 items-center justify-start gap-6 rounded-xl border border-gray-200 bg-white py-4 pl-4 pr-6 sm:w-full lg:w-[600px]"
    >
      <div className="FeatureIconPhoto flex h-14 w-14 items-center justify-center rounded-xl bg-slate-500 bg-opacity-20 p-3.5">
        <div className="ImageCheck relative flex h-8 w-8 flex-col items-start justify-start" />
      </div>
      <div className="Frame326 flex shrink grow basis-0 items-center justify-start gap-1 self-stretch">
        <div className="Title shrink grow basis-0 font-['Inter'] text-lg font-semibold leading-loose text-neutral-900">
          {repo ? kebabToTitleCase(repo.name) : 'Loading...'}
        </div>
        <div className="Frame332 flex items-center justify-center gap-2 rounded-[40px] p-2">
          <div className="ArrowNarrowRight relative h-6 w-6" />
        </div>
      </div>
    </Link>
  )
}

export default Collection
