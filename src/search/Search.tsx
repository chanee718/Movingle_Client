import React from 'react';
import SearchResult from './searchResult';

const Search: React.FC<{ searchedMovies: any[] }> = ({ searchedMovies }) => {
    console.log(searchedMovies)
  return (
    <div>
        <h2>Search Results</h2>
        <SearchResult carouselList={searchedMovies} />
    </div>
  );
}

export default Search;