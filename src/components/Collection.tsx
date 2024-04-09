import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import kebabToTitleCase from '@/lib/kebabToTitleCase';

interface CollectionProps {
  url: string;
}

interface Repo {
  nameWithOwner?: string;
  name?: string;
  // other properties of repo
}

const fetchRepo = async (
  url: string,
  setRepo: React.Dispatch<React.SetStateAction<Repo | null>>,
) => {
  const repoPath = new URL(url).pathname.slice(1);
  const [owner, name] = repoPath.split('/');
  const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await fetch(
      `${NEXT_PUBLIC_API_URL}/api/collection?owner=${owner}&name=${name}`,
      { cache: 'force-cache' },
    );
    if (!response.ok) throw new Error('Failed to fetch repo');

    let repoData = await response.json();
    setRepo(repoData);
  } catch (error) {
    console.error('Error fetching repository:', error);
  }
};

const Collection: React.FC<CollectionProps> = ({ url }) => {
  const [repo, setRepo] = useState<Repo | null>(null);

  useEffect(() => {
    fetchRepo(url, setRepo);
  }, [url]);

  return (
    <Link
      href={repo && repo.nameWithOwner ? `/collection/${repo.nameWithOwner}` : '#'}
      className="FeatureCard inline-flex h-24 items-center justify-start gap-6 rounded-xl border border-gray-200 bg-white py-4 pl-4 pr-6 sm:w-full lg:w-[600px]"
    >
      {/* Other elements */}
      <div className="Title shrink grow basis-0 font-['Inter'] text-lg font-semibold leading-loose text-neutral-900">
        {repo && repo.name ? kebabToTitleCase(repo.name) : 'Loading...'}
      </div>
      {/* Other elements */}
    </Link>
  );
};

export default Collection;
