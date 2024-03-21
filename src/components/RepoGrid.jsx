import React, { useState, useEffect } from 'react';
import { kebabToTitleCase } from '../../helpers/stringFunctions';

const RepoGrid = () => {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetch('https://api.github.com/orgs/wgu-skills/repos')
      .then(response => response.json())
      .then(data => {
        const filteredData = data.filter(repo => repo.name !== 'wgu-skills.github.io');
        setRepos(filteredData);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div className='grid grid-cols-3 gap-4'>
      {repos.map(repo => (
        <div key={repo.id} className='p-4 border border-gray-200 rounded shadow'>
          <h3 className='text-lg font-semibold'>{kebabToTitleCase(repo.name)}</h3>
          <p>{repo.description}</p>
          <a href={`./collections/${repo.name}`} target='_blank' rel='noopener noreferrer' className='text-blue-500 hover:text-blue-700'>
            View on GitHub
          </a>
        </div>
      ))}
    </div>
  );
};

export default RepoGrid;
