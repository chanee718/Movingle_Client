import React from 'react';
import SearchResult from './searchResult';

const Search: React.FC<{ searchedMovies: any[] }> = ({ searchedMovies }) => {
    console.log(searchedMovies)
  return (
    <div>
        <SearchResult carouselList={searchedMovies} />
    </div>
  );
}

export default Search;