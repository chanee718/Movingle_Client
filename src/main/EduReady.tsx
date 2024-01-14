import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './EduReady.css';
import axios from 'axios';

const EduReady: React.FC = () => {
  let { id } = useParams();
  const [movieinfo, setMovieinfo] = useState<any[]>([]);

    useEffect(() => {
        const fetchMovieinfo = async () => {
            try {
              const endpoint: string = `http://172.10.7.55:80/quotes/getMovieInfo?contentsId=${id}`;
              const response = await axios.get(endpoint);
              setMovieinfo(response.data);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
        };

        fetchMovieinfo();
    }, [id]);
  
  const movie = movieinfo[0];

  console.log(id);
  return (
    <div>
      {movie && (
        <>
          <h2>ID = {id}인 영화의 포스터입니다.</h2>
          <img src={movie.poster_url} alt={`ID = ${id} 영화 포스터`} />
        </>
      )} 
    </div>
  );
};

export default EduReady;