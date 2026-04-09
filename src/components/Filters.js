import { memo, useCallback } from 'react';
import styled from 'styled-components';
import { useDynamicFilterOptions } from '../hooks/useDynamicFilterOptions';
import { CustomSelect } from './common';

export const Filters = memo(function Filters({
  filters,
  setFilters,
  onApply,
  onReset
}) {
  const {
    statuses,
    genders,
    speciesList,
    isFetching
  } = useDynamicFilterOptions();
  const handleStatusChange = useCallback(
    (value) => {
      setFilters((prev) => ({ ...prev, status: value }));
    },
    [setFilters]
  );

  const handleGenderChange = useCallback(
    (value) => {
      setFilters((prev) => ({ ...prev, gender: value }));
    },
    [setFilters]
  );

  const handleSpeciesChange = useCallback(
    (value) => {
      setFilters((prev) => ({ ...prev, species: value }));
    },
    [setFilters]
  );

  const handleNameChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      setFilters((prev) => ({ ...prev, [name]: value }));
    },
    [setFilters]
  );

  const handleTypeChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      setFilters((prev) => ({ ...prev, [name]: value }));
    },
    [setFilters]
  );

  return (
    <FiltersContainer>
      <CustomSelect
        options={[
          { value: '', label: 'Status' },
          ...statuses.map((status) => ({ value: status, label: status }))
        ]}
        value={filters.status}
        onChange={handleStatusChange}
        placeholder="Status"
        isFetching={isFetching}
      />

      <CustomSelect
        options={[
          { value: '', label: 'Gender' },
          ...genders.map((gender) => ({ value: gender, label: gender }))
        ]}
        value={filters.gender}
        onChange={handleGenderChange}
        placeholder="Gender"
        isFetching={isFetching}
      />

      <CustomSelect
        options={[
          { value: '', label: 'Species' },
          ...speciesList.map((species) => ({ value: species, label: species }))
        ]}
        value={filters.species}
        onChange={handleSpeciesChange}
        placeholder="Species"
        isFetching={isFetching}
      />

      <Input
        type="text"
        name="name"
        placeholder="Name"
        value={filters.name}
        onChange={handleNameChange}
        aria-label="Search by name"
      />
      <Input
        type="text"
        name="type"
        placeholder="Type"
        value={filters.type}
        onChange={handleTypeChange}
        aria-label="Search by type"
      />

      <ButtonContainer>
        <StyledButton $color="#83bf46" onClick={onApply}>
          Apply
        </StyledButton>
        <StyledButton $color="#ff5152" onClick={onReset}>
          Reset
        </StyledButton>
      </ButtonContainer>
    </FiltersContainer>
  );
});

const FiltersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 180px);
  justify-content: space-between;
  gap: 10px;

  @media (max-width: 950px) {
    grid-template-columns: repeat(3, 150px);
    gap: 10px;
  }

  @media (max-width: 530px) {
    grid-template-columns: repeat(1, 240px);
    row-gap: 15px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  background: #263750;
  border: 1px solid #83bf46;
  border-radius: 8px;
  cursor: pointer;
  color: #f5f5f5;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &::placeholder {
    color: #b3b3b3;
    opacity: 1;
  }
  @media (hover: hover) {
    &:hover {
      background: #334466;
    }
  }
  &:focus {
    outline: none;
    background: #334466;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  column-gap: 10px;
  row-gap: 15px;

  @media (max-width: 530px) {
    flex-direction: column;
  }
`;

const StyledButton = styled.button`
  flex: 1;
  padding: 12px 20.5px;
  background: inherit;
  border-radius: 8px;
  cursor: pointer;
  color: ${({ $color }) => $color};
  border: 1px solid ${({ $color }) => $color};

  @media (max-width: 950px) {
    padding: 12px 13px;
  }
  @media (hover: hover) {
    &:hover {
      color: white;
      background: ${({ $color }) => $color};
    }
  }
`;
