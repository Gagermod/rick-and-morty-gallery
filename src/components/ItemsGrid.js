import { useState, useCallback } from 'react';
import styled from 'styled-components';
import { Card } from './Card';
import { Popup } from './popup';

const defaultPopupSettings = {
  visible: false,
  content: {}
};

export function ItemsGrid({ characters }) {
  const [popupSettings, setPopupSettings] = useState(defaultPopupSettings);

  const handleCardClick = useCallback(
    (id) => {
      const character = characters.find((character) => character.id === id);
      if (character) {
        setPopupSettings({
          visible: true,
          content: { ...character }
        });
      }
    },
    [characters]
  );

  if (!characters.length) {
    return null;
  }

  return (
    <Container>
      {characters.map(({ id, ...rest }) => (
        <Card key={id} id={id} onClickHandler={handleCardClick} {...rest} />
      ))}

      <Popup settings={popupSettings} setSettings={setPopupSettings} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  justify-items: center;
  gap: 30px;
`;
