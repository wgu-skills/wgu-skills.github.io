import Link from 'next/link'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import GitHubPreviewImage from '@/components/GitHubPreviewImage'

interface Collection {
  primary_sector: string
  secondary_sector: string
  name: string
  url: string
  slug: string
  uuid: string
  repo_url: string
}

const CollectionsList = ({ collections }: { collections: Collection[] }) => {
  if (!collections || collections.length === 0) {
    return <p>No collections found.</p>
  }

  return (
    <ul role="list"
    className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
      {collections.map((item) => (
        <li key={item.uuid} className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
          <div className="flex min-w-0 gap-x-4">
            <GitHubPreviewImage repoUrl={item.repo_url} repoName={item.name} />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
              <Link href={`/collections/${item.uuid}`}>
                  <span className="absolute inset-x-0 -top-px bottom-0" />
                  {item.name}
                </Link>
              </p>
              <p className="mt-1 flex text-xs leading-5 text-gray-500">
                {/* <a href={`mailto:${item.email}`} className="relative truncate hover:underline">
                  {item.email}
                </a> */}
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-x-4">
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              {/* <p className="text-sm leading-6 text-gray-900">{item.role}</p> */}
             
            </div>
            <ChevronRightIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
          </div>
        </li>
      ))}
    </ul>
  )
}

export default CollectionsList
