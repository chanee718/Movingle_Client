import React from 'react';
import SearchResult from './searchResult';
import './search.css';

const Search: React.FC<{ searchedMovies: any[] }> = ({ searchedMovies }) => {
    console.log(searchedMovies)
  return (
    <div className="ctinr">
      <h2 className="wt">Search Results</h2>
      <SearchResult carouselList={searchedMovies} />
    </div>
  );
}

export default Search;