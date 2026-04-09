import axios from 'axios';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';

const API_BASE_URL = 'https://rickandmortyapi.com/api/character/';

const DataContext = createContext({});

export function DataProvider({ children, filters }) {
  const [characters, setCharacters] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [info, setInfo] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = useCallback(async () => {
    setIsFetching(true);
    setIsError(false);

    const params = new URLSearchParams();
    if (filters.name) params.append('name', filters.name);
    if (filters.status) params.append('status', filters.status);
    if (filters.gender) params.append('gender', filters.gender);
    if (filters.species) params.append('species', filters.species);
    if (filters.type) params.append('type', filters.type);
    params.append('page', currentPage);

    const url = `${API_BASE_URL}?${params}`;

    try {
      const { data } = await axios.get(url);
      setCharacters(data.results);
      setInfo(data.info);
    } catch (error) {
      setIsError(true);
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  }, [filters, currentPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const dataValue = useMemo(
    () => ({
      characters,
      isFetching,
      isError,
      info,
      currentPage,
      setCurrentPage
    }),
    [characters, isFetching, isError, info, currentPage]
  );

  return (
    <DataContext.Provider value={dataValue}>{children}</DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
