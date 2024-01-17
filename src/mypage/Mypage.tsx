import React, { useState, useEffect } from 'react';
import './Mypage.css';
import History from './History'
import axios from 'axios';

interface Word {
  word: string;
  definition: string;
}

const Mypage: React.FC = () => {
  const [user, setUser] = useState<any>();
  const [words, setWords] = useState<any[]>([]);
  const [movies, setMovies] = useState<any[]>([]);
  const [tier, setTier] = useState<string>('Bronze');

  const userEmail = localStorage.getItem('loginMail') || sessionStorage.getItem('loginMail');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const endpoint: string = `http://172.10.7.55:80/mypage?email=${userEmail}`;
        const response = await axios.get(endpoint);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchWordsData = async () => {
      try {
        const endpoint: string = `http://172.10.7.55:80/education/getAll?email=${userEmail}`;
        const response = await axios.get(endpoint);
        setWords(response.data.words);
      } catch (error) {
        console.error('Error fetching word data:', error);
      }
    };

    const fetchMoviesData = async () => {
      try {
        const endpoint: string = `http://172.10.7.55:80/mypage/getMovie?email=${userEmail}`;
        const response = await axios.get(endpoint);
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    if (userEmail) {
      fetchUserData();
      fetchWordsData();
      fetchMoviesData();
    }
  }, [userEmail]);

  console.log(user);
  console.log(words);
  console.log(movies);

  useEffect(() => {
    const calculatedTotalScore = movies.length * 10 + words.length;

    if (calculatedTotalScore >= 300) {
      setTier('Master');
    } else if (calculatedTotalScore >= 200) {
      setTier('Gold');
    } else if (calculatedTotalScore >= 100) {
      setTier('Silver');
    } else {
      setTier('Bronze');
    }
  }, [movies, words]);

  const getTierEmoji = () => {
    switch (tier) {
      case 'Master':
        return '🏅';
      case 'Gold':
        return '🥇';
      case 'Silver':
        return '🥈';
      case 'Bronze':
        return '🥉';
      default:
        return '🥉';
    }
  };

  const groupWords = (words: Word[], size: number): Word[][] => {
    return words.reduce<Word[][]>((acc, curr, i) => {
      if (i % size === 0) acc.push([]);
      acc[Math.floor(i / size)].push(curr);
      return acc;
    }, []);
  };
  
  const groupedWords = groupWords(words, 3);

  return (
    <>
      {user && (
        <>
          <h2 className='welcome'>{getTierEmoji()} Welcome, {user.data.firstname} {user.data.lastname} !</h2>
          <div className='profile'>
            <div className='profileImg'>
              <img src={`http://172.10.7.55/public/images/${user.data.profileImage}`} alt={`${user.data.firstname} profile`} />
            </div>
            <p className='oneliner'>{user.data.oneliner}</p>
            <p className='tiertext'>Your tier is <span className='tier'>{tier} {getTierEmoji()}</span></p>
            <div className='divider1'></div>
            <div className='ctn'>
              <p className='contentnum'>Number of Contents</p>
              <p className='num'>{movies.length}</p>
            </div>
            <div className='divider2'></div>
            <div className='vcn'>
              <p className='vocabnum'>Saved Words</p>
              <p className='num'>{words.length}</p>
            </div>
          </div>
          <div className='movieContainer'>
          </div>
          <div className='history'>
            <h2 className='htext'>History</h2>
            <History carouselList={movies} />
          </div>
          <div className='myvocab'>
            <h2>My Vocabulary</h2>
            <div className='wordContainer'>
              {words.map((word, index) => (
                <div key={index} className='wordEntry'>
                  <p className='term'>{word.word}</p>
                  <p className='definition'>{word.definition}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Mypage;