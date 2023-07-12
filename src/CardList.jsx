import React, { useState, useRef, useEffect } from 'react';
import './style/SearchableCardList.css';
import PropTypes from 'prop-types';
// the contents of each card and where they link
const cards = [
  {
    id: 1,
    title: 'Fuel Calculator',
    url: 'apps/milage.html',
  },
  {
    id: 2,
    title: 'Json Validator',
    url: 'apps/json.html',
  },
  {
    id: 3,
    title: 'Text Case Converter',
    url: 'apps/toLowercase.html',
  },
  {
    id: 4,
    title: 'Hex Converter',
    url: 'apps/typeConv.html',
  },
  {
    id: 5,
    title: 'Commit Message Formatter',
    url: 'apps/commitMessage.html',
  },
];

function Card({ title, url, isSelected }) {
  return (

    <a href={url} style={{ textDecoration: 'none' }}>
      <div
        className="Lcard"
        style={{
          width: '300px',
          backgroundColor: isSelected ? '#f5f5f5' : '#f3f3f3',
        }}
      >
        <p style={{ textdecoration: 'none', color: isSelected ? '#333333' : 'grey' }}>
          {title}
        </p>
      </div>
    </a>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

// function to make the Cardlist keyboard navigatable
function SearchableCardList() {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [filteredCards, setFilteredCards] = useState(cards);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          setSelectedIndex((prevIndex) => (
            prevIndex <= -1 ? filteredCards.length - 1 : prevIndex - 1));
          break;
        case 'ArrowDown':
          event.preventDefault();
          setSelectedIndex((prevIndex) => (
            prevIndex === filteredCards.length - 1 ? -1 : prevIndex + 1));
          break;
        case 'Enter':
          if (filteredCards.length > 0) {
            const selectedCard = filteredCards[selectedIndex];
            window.location.href = selectedCard.url;
          }
          break;
        default:
          break;
      }
      if (selectedIndex === -1) {
        inputRef.current.focus(); // focus on input field
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [filteredCards, selectedIndex]);

  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);

    const filtered = cards.filter((card) => (
      card.title.toLowerCase().includes(newQuery.toLowerCase())));
    setFilteredCards(filtered);
    setSelectedIndex(-1);
  };

  return (
    <div className="card-list">
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={handleInputChange}
        ref={inputRef}
        className="search-input"
      />

      {filteredCards.map((card, index) => (
        <Card
          key={card.id}
          title={card.title}
          url={card.url}
          isSelected={index === selectedIndex}
        />
      ))}
    </div>
  );
}

export default SearchableCardList;
