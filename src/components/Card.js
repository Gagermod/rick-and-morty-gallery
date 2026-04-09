import { useCallback } from 'react';
import styled from 'styled-components';
import { getGenderIcon, getStatusColor } from '../utils/characterUtils';

export function Card({
  id,
  status,
  name,
  species,
  type,
  gender,
  image,
  onClickHandler
}) {
  const genderIcon = getGenderIcon(gender);
  const statusColor = getStatusColor(status);

  const handleClick = useCallback(() => {
    onClickHandler(id);
  }, [onClickHandler, id]);

  return (
    <StyledCard onClick={handleClick}>
      <CardImg src={image} alt={name} />

      <CardInfo>
        <CardTitleContainer>
          <StyledCardTitle className="card-title">{name}</StyledCardTitle>
          <IconContainer>{genderIcon}</IconContainer>
        </CardTitleContainer>

        <CardStatusContainer>
          <StyledCardStatus $color={statusColor}>{status}</StyledCardStatus>
          &nbsp;-&nbsp;
          <CardSpecies>{species}</CardSpecies>
          {type && <CardType>{type}</CardType>}
        </CardStatusContainer>
      </CardInfo>
    </StyledCard>
  );
}

const StyledCard = styled.div`
  display: flex;
  width: 100%;
  max-width: 400px;
  flex-direction: column;
  background: #263750;
  border-radius: 10px;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    cursor: pointer;
    transform: scale(1.01);
    box-shadow: 5px 5px 8px rgba(0, 0, 0, 0.2);
  }

  &:hover .card-title {
    color: #83bf46;
  }
`;

const CardImg = styled.img`
  border-radius: 10px 10px 0 0;
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;
  padding: 20px;
`;

const CardTitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const StyledCardTitle = styled.h2`
  margin-right: 8px;
  transition: color 0.3s;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
  font-size: 24px;

  @media (max-width: 450px) {
    max-width: 130px;
    font-size: 18px;
  }
`;

const IconContainer = styled.div`
  display: flex;
`;

const CardStatusContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StyledCardStatus = styled.span`
  display: flex;
  align-items: center;
  text-transform: capitalize;

  &::before {
    content: '';
    display: block;
    margin-right: 8px;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background-color: ${({ $color }) => $color};
  }
`;

const CardSpecies = styled.span``;

const CardType = styled.p`
  margin-top: 20px;
  width: 100%;
  color: #ddd;
  font-size: 16px;
`;
