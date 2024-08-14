import React from 'react'

export const Card = ({ card, onClick }) => {
  return (
      <div className='card' onClick={onClick}>
          <img src={card.imgUrl} alt={`Card ${card.id}`} />
      </div>
  );
};

export default Card