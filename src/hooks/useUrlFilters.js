import { useSearchParams } from 'react-router-dom';

export function useUrlFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const getFiltersFromUrl = () => ({
    name: searchParams.get('name') || '',
    status: searchParams.get('status') || '',
    gender: searchParams.get('gender') || '',
    species: searchParams.get('species') || '',
    type: searchParams.get('type') || ''
  });
  const updateUrl = (filters) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== '') {
        params.set(key, value);
      }
    });
    setSearchParams(params, { replace: true });
  };
  const resetUrl = () => {
    setSearchParams({}, { replace: true });
  };

  return { getFiltersFromUrl, updateUrl, resetUrl };
}
