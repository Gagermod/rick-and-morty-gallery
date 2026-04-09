import styled from 'styled-components';
import { Filters } from '../Filters';
import { Logo } from './Logo';

export function Header({
  filters,
  setFilters,
  speciesList,
  isSpeciesFetching,
  onApply,
  onReset
}) {
  return (
    <HeaderContainer>
      <Logo />
      <Filters
        filters={filters}
        setFilters={setFilters}
        speciesList={speciesList}
        isSpeciesFetching={isSpeciesFetching}
        onApply={onApply}
        onReset={onReset}
      />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  column-gap: 20px;
  align-items: center;

  @media (max-width: 950px) {
    flex-direction: column;
    row-gap: 30px;
  }
`;
