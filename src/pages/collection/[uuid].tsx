import { GetServerSideProps, NextPage } from 'next';

// Define props type
interface CollectionPageProps {
  collectionData: any; // Replace 'any' with a more specific type for your data
}

const CollectionPage: NextPage<CollectionPageProps> = ({ collectionData }) => {
  // You can use the collectionData fetched from your server here
  return (
    <div>
      <h1>{ collectionData.name }</h1>
      <p>{ collectionData.description }</p>
    </div>
  );
};

// Fetch data on the server side
export const getServerSideProps: GetServerSideProps = async (context) => {

  const { uuid } = context.params!;
  const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
  let collectionData = null;

  // Fetch data using the UUID
  try {
    const response = await fetch(`${ NEXT_PUBLIC_API_URL }/api/collection/${uuid}`);
    collectionData = await response.json();
  } catch (error) {
    console.error('Error fetching collection data:', error);
    // Handle errors as needed
  }

  return {
    props: {
      collectionData, // This data will be passed to the page component as props
    },
  };
};

export default CollectionPage;
