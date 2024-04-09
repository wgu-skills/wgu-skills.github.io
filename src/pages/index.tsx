// pages/index.tsx
import fetchCollectionsData from '@/lib/fetchCollectionsData'
import CollectionsList from '@/components/CollectionsList'
import type { NextPage } from 'next'

interface IndexProps {
  collections: any[];
  error: string;
}

const Index: NextPage<IndexProps> = ({ collections = [], error }) => {
  return (
    <div> {/* Wrap the content in a div or another appropriate element */}
      {error ? (
        <p>Error loading collections: {error}</p>
      ) : collections.length > 0 ? (
        <div className='py-5 px-10'>
        <CollectionsList collections={collections} />
        </div>
      ) : (
        <p>No collections found.</p>
      )}
    </div>
  );
};

export default Index;

export async function getStaticProps() {
  try {
    const collections = await fetchCollectionsData();

    collections.sort((a, b) => a.name.localeCompare(b.name));

    return {
      props: {
        collections,
      },
    };
  } catch (error: any) {
    console.error('Error fetching collections:', error);
    return {
      props: {
        collections: [],
        error: error.message || 'Failed to load data',
      },
    };
  }
}
