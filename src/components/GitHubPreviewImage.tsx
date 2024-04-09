import React, { useState, useEffect, useTransition } from 'react';
import Image from 'next/image';
import PlaceholderImage from '@/images/placeholder.png';

interface GitHubPreviewImageProps {
  repoUrl: string;
  repoName: string;
}

const GitHubPreviewImage: React.FC<GitHubPreviewImageProps> = ({ repoUrl, repoName }) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const getPreviewImage = async () => {
      const repoPath = new URL(repoUrl).pathname.slice(1); // remove leading '/'
      const [owner, name] = repoPath.split('/');

      const query = `
        query {
          repository(owner: "${owner}", name: "${name}") {
            openGraphImageUrl
          }
        }
      `;

      try {
        const response = await fetch('https://api.github.com/graphql', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ query })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Check if openGraphImageUrl is available
        if (data?.data?.repository?.openGraphImageUrl) {
          startTransition(() => {
            setImageUrl(data.data.repository.openGraphImageUrl);
          });
        } else {
          // Handle case where openGraphImageUrl is not present or null
          console.error('No openGraphImageUrl found for repository:', repoName);
        }
      } catch (error) {
        console.error('Error fetching GitHub repo data:', error);
      }
    };

    getPreviewImage();
  }, [repoUrl]);

  return (
    <div>
      {isPending ? (
        <div>Loading...</div>
      ) : imageUrl ? (
        <Image src={imageUrl} alt={repoName} width={256} height={128} className="aspect-w-2 aspect-h-1 w-full h-auto object-cover border border-gray-200" />
      ) : (
        <Image src={PlaceholderImage} alt="" width={256} height={128} className="aspect-w-2 aspect-h-1 w-full h-auto object-cover border border-gray-200"/>
      )}
    </div>
  );
};

export default GitHubPreviewImage;
