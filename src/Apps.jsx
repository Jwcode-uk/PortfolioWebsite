import './App.css';
import React from 'react';
import SearchableCardList from './CardList';
import Nav from './components/Nav';

function Projects() {
  return (
    <div>
      <Nav />
      <SearchableCardList />
    </div>
  );
}
export default Projects;
