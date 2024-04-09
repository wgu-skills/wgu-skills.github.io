// pages/index.tsx
import CollectionsList from '@/components/CollectionsList';
import type { NextPage, GetStaticProps } from 'next';

interface IndexProps {
  collections?: any[];
  error?: string;
}

const Index: NextPage<IndexProps> = ({ collections = [], error }) => (
  <div>
    {error ? (
      <p>Error loading collections: {error}</p>
    ) : collections.length > 0 ? (
      <div className="py-10">
        <CollectionsList collections={collections} />
      </div>
    ) : (
      <p>No collections found.</p>
    )}
  </div>
);

export default Index;

export const getStaticProps: GetStaticProps = async () => {
  const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
  
  try {
    const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/collections`);
    if (!response.ok) throw new Error('Failed to fetch collections');
    
    let collections = await response.json();
    collections.sort((a, b) => a.name.localeCompare(b.name));

    return {
      props: {
        collections,
      },
    };
  } catch (error) {
    console.error('Error fetching collections:', error);
    return {
      props: {
        error: error instanceof Error ? error.message : 'Failed to load data',
      },
    };
  }
};
