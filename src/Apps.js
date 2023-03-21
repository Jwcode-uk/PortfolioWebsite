import './App.css';
import React, { useRef } from 'react'
import SearchableCardList from './CardList';
function Projects() {

      const homeOnClickRef = useRef(null);
      const scrollEffect = ( targetRef ) =>{
        targetRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }

    return (
        <div  >            
            <SearchableCardList></SearchableCardList>
        </div>

    );
}

export default Projects;
