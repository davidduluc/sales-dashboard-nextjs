'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {

  // Get the current search parameters from the URL
  const searchParams = useSearchParams();

  // Get the current pathname (URL path without query parameters)
  const pathname = usePathname();

  // Destructure the replace function from useRouter
  // This function is used to update the URL without triggering a full page reload
  const { replace } = useRouter();

  /**
   * Handles the search functionality with debounce.
   * @param {string} term - The search term entered by the user.
   */
  const handleSearch = useDebouncedCallback((term: string) => {
    // Create a new URLSearchParams object from the current search params
    const params = new URLSearchParams(searchParams);

    // Reset the page to 1 when a new search is performed
    params.set('page', '1');

    // If a search term is provided, set it in the query params
    // Otherwise, remove the query param
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    // Update the URL with the new search params
    replace(`${pathname}?${params.toString()}`);
  }, 300); // Debounce delay of 300ms


  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
