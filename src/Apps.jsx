import './style/App.css';
import React from 'react';
import SearchableCardList from './CardList';
// eslint-disable-next-line import/no-cycle
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
