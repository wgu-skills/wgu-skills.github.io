import Collection from './Collection'

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
    <ul role="list" className="space-y-10 flex flex-col p-3 lg:p-0">
      {collections.map((item) => (
        <Collection key={item.uuid} url={item.repo_url} />
      ))}
    </ul>
  )
}

export default CollectionsList
