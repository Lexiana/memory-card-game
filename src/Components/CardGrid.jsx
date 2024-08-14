import React from "react";
import { Card } from "./Card";

const CardGrid = ({ cards, onCardClick }) => {
  const visibleCards = cards.slice(0, 10);
  return (
      <div className='card-grid'>
          {visibleCards.map(card => (
              <Card key={card.id} card={card} onClick={() => onCardClick(card.id)} />
          ))}
      </div>
  );
};

export default CardGrid;
