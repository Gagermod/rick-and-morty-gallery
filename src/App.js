import { useCallback, useState } from 'react';
import styled from 'styled-components';
import {
  Pagination,
  ItemsGrid,
  Header,
  AppState,
  DataProvider,
  useData
} from './components';
import { useUrlFilters } from './hooks/useUrlFilters';

function AppContent({ onApply, onReset }) {
  const { characters, isFetching, isError, setCurrentPage } = useData();
  const { getFiltersFromUrl } = useUrlFilters();
  const [formFilters, setFormFilters] = useState(getFiltersFromUrl());

  const handleApply = useCallback(() => {
    onApply(formFilters);
    setCurrentPage(1);
  }, [onApply, formFilters, setCurrentPage]);

  const handleReset = useCallback(() => {
    const emptyFilters = {
      name: '',
      status: '',
      gender: '',
      species: '',
      type: ''
    };
    setFormFilters(emptyFilters);
    onReset();
    setCurrentPage(1);
  }, [onReset, setCurrentPage]);

  return (
    <Main>
      <Header
        filters={formFilters}
        setFilters={setFormFilters}
        onApply={handleApply}
        onReset={handleReset}
      />

      <AppState />

      {!isFetching && !isError && (
        <>
          <ItemsGrid characters={characters} />

          <Pagination />
        </>
      )}
    </Main>
  );
}

export function App() {
  const { getFiltersFromUrl, updateUrl, resetUrl } = useUrlFilters();
  const [activeFilters, setActiveFilters] = useState(getFiltersFromUrl());

  const handleApply = useCallback(
    (newFilters) => {
      setActiveFilters(newFilters);
      updateUrl(newFilters);
    },
    [updateUrl]
  );

  const handleReset = useCallback(() => {
    const emptyFilters = {
      name: '',
      status: '',
      gender: '',
      species: '',
      type: ''
    };
    setActiveFilters(emptyFilters);
    resetUrl();
  }, [resetUrl]);

  return (
    <DataProvider filters={activeFilters}>
      <AppContent onApply={handleApply} onReset={handleReset} />
    </DataProvider>
  );
}

const Main = styled.main`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 20px 0;
  max-width: 80%;
  margin: 0 auto;

  @media (max-width: 1200px) {
    max-width: 95%;
  }

  @media (max-width: 930px) {
    max-width: 85%;
  }

  @media (max-width: 600px) {
    max-width: 90%;
  }
`;
