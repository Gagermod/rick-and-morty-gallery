import { useRef, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

const arrowDown = `
  url("data:image/svg+xml,%3Csvg width='16' height='16' 
  viewBox='0 0 16 16' fill='none' 
  xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 6L8 10L12 6' 
  stroke='%23B2B2B2' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")
`;

const arrowUp = `
  url("data:image/svg+xml,%3Csvg width='16' height='16' 
  viewBox='0 0 16 16' fill='none' 
  xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 10L8 6L12 10' 
  stroke='%23F5F5F5' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")
`;

const clearIcon = `
  url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' 
  width='16' height='16' viewBox='0 0 16 16' 
  fill='none'%3E%3Cpath d='M4 12L8 8L12 12' 
  stroke='%23F5F5F5' stroke-width='1.6' 
  stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath 
  d='M4 4L8 8L12 4' stroke='%23F5F5F5' stroke-width='1.6' 
  stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")
`;

const clearIconHover = `
  url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' 
  width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='M4 12L8 8L12 12' 
  stroke='%2383BF46' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath 
  d='M4 4L8 8L12 4' stroke='%2383BF46' stroke-width='1.6' 
  stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")
`;

const OptionItem = ({ option, isSelected, onSelect }) => {
  const handleClick = useCallback(() => {
    onSelect(option.value);
  }, [onSelect, option.value]);

  return (
    <Option role="option" aria-selected={isSelected} onClick={handleClick}>
      {option.label}
    </Option>
  );
};

export function CustomSelect({
  options,
  value,
  onChange,
  placeholder,
  isFetching
}) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const selectedOption = options.find((option) => option.value === value);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleSelect = useCallback(
    (val) => {
      onChange(val);
      setIsOpen(false);
    },
    [onChange]
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClear = useCallback(
    (event) => {
      event.stopPropagation();
      onChange('');
    },
    [onChange]
  );

  const hasValue = value !== '' && value !== null && value !== undefined;

  return (
    <SelectWrapper ref={wrapperRef}>
      <SelectButton
        $hasValue={hasValue}
        $isOpen={isOpen}
        onClick={toggleOpen}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={placeholder}
        disabled={isFetching}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <IconContainer>
          {hasValue && !isOpen && (
            <ClearIcon onClick={handleClear} aria-label="Clear" />
          )}
          {(!hasValue || isOpen) && <ArrowIcon $isOpen={isOpen} />}
        </IconContainer>
      </SelectButton>
      {isOpen && !isFetching && (
        <OptionsList>
          {options.map((option) => (
            <OptionItem
              key={option.value}
              option={option}
              isSelected={value === option.value}
              onSelect={handleSelect}
            />
          ))}
        </OptionsList>
      )}
    </SelectWrapper>
  );
}

const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const SelectButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  color: ${({ $hasValue }) => ($hasValue ? '#ffffff' : '#b3b3b3')};
  text-align: left;
  background: #263750;
  border: 1px solid #83bf46;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: #334466;
  }
  &:focus {
    outline: none;
    background-color: #334466;
    border-color: #83bf46;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
`;

const IconBase = `
  width: 16px;
  height: 16px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;

const ArrowIcon = styled.div`
  ${IconBase};
  background-image: ${({ $isOpen }) => ($isOpen ? arrowUp : arrowDown)};
`;

const ClearIcon = styled.button`
  ${IconBase};
  background-image: ${clearIcon};
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;

  &:hover {
    background-image: ${clearIconHover};
  }
`;

const OptionsList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 195px;
  padding: 0;
  margin-top: 5px;
  background: white;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  z-index: 10;
  overflow-y: auto;
  list-style: none;
`;

const Option = styled.li`
  padding: 8px;
  cursor: pointer;
  color: #1e1e1e;
  line-height: 140%;
  &:hover {
    background: rgba(131, 191, 70, 0.2);
  }
  &[aria-selected='true'] {
    font-weight: 600;
  }
`;
