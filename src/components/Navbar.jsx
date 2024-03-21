import { useEffect } from 'react';
import Logo from './Logo';
import { Disclosure } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';

export default function Example() {
	// Function to handle keydown event
	const handleKeyDown = (event) => {
		const searchField = document.getElementById('search-field');
		if (event.key === 'k' && event.metaKey) {
			if (searchField) {
				searchField.focus();
				event.preventDefault(); // Prevents the default action of the key press
			}
		} else if (event.key === 'Escape') {
			if (searchField && document.activeElement === searchField) {
				searchField.blur(); // Unfocus the search field
			}
		}
	};

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);

		// Cleanup the event listener
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	return (
		<div className='bg-WGUblue'>
		<Disclosure
			as='nav'
			className='flex flex-row items-center px-8 py-4 gap-4 max-w-7xl mx-auto'>
			<div className='shrink-0'>
				<Logo className='m-0 text-stone-900 cursor-pointer' />
			</div>
			<div className='shrink-0 text-white p-1'>
				Open Source Management Toolkit
			</div>
			<div className='grow'></div>
			<div className='grow'>
				<div className='relative flex items-center'>
					<MagnifyingGlassIcon
						className='absolute w-5 h-5 ml-3 text-white'
						aria-hidden='true'
					/>
					<input
						id='search-field'
						type='search'
						name='search'
						className='flex-grow h-full pl-12 pr-3 py-2 text-lg rounded-lg bg-slate-900 bg-opacity-40 focus-within:bg-opacity-100 border-0 text-white focus:outline-none focus:ring-0'
						placeholder='Search...'
					/>
					<div className='absolute inset-y-0 right-0 flex py-1.5 pr-1.5'>
						<kbd className='inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400'>
							⌘K
						</kbd>
					</div>
				</div>
			</div>
		</Disclosure>
		</div>
	);
}
