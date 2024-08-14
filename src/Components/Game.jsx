import React, { useState, useEffect } from "react";
import CardGrid from "./CardGrid";
import Scoreboard from "./Scoreboard";
import "./Game.css";

const Game = () => {
  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  var API_KEY = process.env.REACT_APP_PIXABAY_API_KEY;
  var apiUrl = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
    "ai generated dragon"
  )}&per_page=50`;

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        const fetchedCards = data.hits.map((hit) => ({
          id: hit.id,
          imgUrl: hit.webformatURL,
          clicked: false,
        }));
        setCards(shuffleCards(fetchedCards));
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const shuffleCards = (cards) => {
    return cards.sort(() => Math.random() - 0.5);
  };

  const handleClick = (id) => {
    const updatedCards = cards.map((card) => {
      if (card.id === id) {
        if (card.clicked) {
          setScore(0);
          return { ...card, clicked: false };
        } else {
          setScore((prevScore) => prevScore + 1);
          if (score + 1 > bestScore) {
            setBestScore(score + 1);
          }
          return { ...card, clicked: true };
        }
      }
      return card;
    });
    setCards(shuffleCards(updatedCards));
  };

  return (
    <div className="Game">
      <h1>Memory Game</h1>
      <p>
        Click on an image to earn points, but don't click on any more than once!
      </p>
      <Scoreboard score={score} bestScore={bestScore} />
      <CardGrid cards={cards} onCardClick={handleClick} />
    </div>
  );
};

export default Game;
