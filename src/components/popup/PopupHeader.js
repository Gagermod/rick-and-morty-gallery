import styled from 'styled-components';
import { getGenderIcon, getStatusColor } from '../../utils/characterUtils';

export function PopupHeader({ image, name, gender, status, species, type }) {
  const genderIcon = getGenderIcon(gender);
  const statusColor = getStatusColor(status);

  return (
    <PopupHeaderContainer>
      <PopupImage src={image?.replace('../', '')} alt={name} />

      <PopupTitle>
        {name} {genderIcon}
      </PopupTitle>

      <PopupStatus>
        <StatusLine>
          <StatusDot $color={statusColor} />
          {status} - {species}
        </StatusLine>
        {type && <PopupType>{type}</PopupType>}
      </PopupStatus>
    </PopupHeaderContainer>
  );
}

const PopupHeaderContainer = styled.div``;

const PopupImage = styled.img`
  display: block;
  border-radius: 5px;
  margin: 0 auto;
  object-fit: cover;
  width: 100%;
  height: 100%;
  max-width: 350px;
  max-height: 350px;
`;

const PopupTitle = styled.h2`
  font-size: 22px;
  margin-top: 30px;
  text-align: center;
`;

const PopupStatus = styled.div`
  font-size: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const StatusLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const StatusDot = styled.span`
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
`;

const PopupType = styled.p`
  margin-top: 10px;
  font-size: 16px;
  color: #ddd;
`;
