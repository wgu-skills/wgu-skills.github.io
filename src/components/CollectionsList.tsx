import Link from "next/link";

interface Collection {
  primary_sector: string;
  secondary_sector: string;
  name: string;
  url: string;
  slug: string;
  uuid: string;
  repo_url: string;
}

const CollectionsList = ({ collections }: { collections: Collection[] }) => {
  if (!collections || collections.length === 0) {
    return <p>No collections found.</p>;
  }

  return (
    <ul>
      {collections.map((item) => (
        <li key={item.uuid || item.name}>
          <Link href={`/collection/${item.uuid}`}>
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default CollectionsList;