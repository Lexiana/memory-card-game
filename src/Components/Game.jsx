import React, { useState, useEffect } from "react";
import CardGrid from "./CardGrid";
import Scoreboard from "./Scoreboard";
import "./Game.css";

const Game = () => {
  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isPhone, setIsPhone] = useState(false);
  const API_KEY = process.env.REACT_APP_PIXABAY_API_KEY;
  const query = encodeURIComponent("ai generated dragon");

  useEffect(() => {
    const checkIfPhone = () => {
      setIsPhone(window.innerWidth <= 600);
    };

    checkIfPhone();
    window.addEventListener("resize", checkIfPhone);

    return () => window.removeEventListener("resize", checkIfPhone);
  }, []);

  useEffect(() => {
    const cardsPerPage = isPhone ? 8 : 12;
    const apiUrl = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&per_page=${cardsPerPage}`;

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
  }, [isPhone, API_KEY]);

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
    <div className="game">
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
