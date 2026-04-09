import { useCallback } from 'react';
import styled from 'styled-components';
import { useData } from './providers';

const PageButton = ({ page, active, onPageChange, label }) => {
  const handleClick = useCallback(() => {
    onPageChange(page);
  }, [onPageChange, page]);

  const displayText = label || page;

  if (active) {
    return <Page active>{displayText}</Page>;
  }

  return <Page onClick={handleClick}>{displayText}</Page>;
};

export function Pagination() {
  const { info, currentPage, setCurrentPage } = useData();

  const totalPages = info?.pages || 0;

  const handlePageChange = useCallback(
    (page) => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setCurrentPage(page);
    },
    [setCurrentPage]
  );

  if (totalPages <= 1) return null;

  const showFirst = currentPage > 2;
  const showPrev = currentPage > 1;
  const showNext = currentPage < totalPages;
  const showLast = currentPage < totalPages - 1;

  return (
    <StyledPagination>
      {showFirst && (
        <>
          <PageButton
            page={1}
            onPageChange={handlePageChange}
            label="« First"
          />
          <Ellipsis>...</Ellipsis>
        </>
      )}

      {showPrev && (
        <PageButton page={currentPage - 1} onPageChange={handlePageChange} />
      )}

      <PageButton page={currentPage} active onPageChange={handlePageChange} />

      {showNext && (
        <PageButton page={currentPage + 1} onPageChange={handlePageChange} />
      )}

      {showLast && (
        <>
          <Ellipsis>...</Ellipsis>
          <PageButton
            page={totalPages}
            onPageChange={handlePageChange}
            label="Last »"
          />
        </>
      )}
    </StyledPagination>
  );
}

const StyledPagination = styled.div`
  width: 100%;
  text-align: center;
`;

const Page = styled.span`
  color: #fff;
  font-size: 18px;
  padding: 5px;
  cursor: pointer;
  transition: color 0.2s;
  ${({ active }) => active && 'color: #83bf46'};

  &:hover {
    color: #83bf46;
  }
`;

const Ellipsis = styled(Page)`
  cursor: default;

  &:hover {
    color: #fff;
  }
`;
