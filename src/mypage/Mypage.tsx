import React, { useState, useEffect } from 'react';
import './Mypage.css';
import axios from 'axios';

const Mypage: React.FC = () => {
  const [user, setUser] = useState<any>();
  const [words, setWords] = useState<any[]>([]);

  const userEmail = localStorage.getItem('loginMail') || sessionStorage.getItem('loginMail');
  useEffect(() => {
    const fetchMovieinfo = async () => {
      try {
        const endpoint: string = `http://172.10.7.55:80/mypage?email=${userEmail}`;
        const response = await axios.get(endpoint);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchMovieinfo();
  }, [userEmail]);

  const fetchWords = async () => {
    try {
      const endpoint: string = `http://172.10.7.55:80/education/getAll?email=${userEmail}`;
      const response = await axios.get(endpoint);
      setWords(response.data.words);
    } catch (error) {
      console.error('Error fetching word data:', error);
    }
  };
  fetchWords();

  console.log(user);
  console.log(words);

  return (
    <>
      {user && (
        <>
          <h2 className='welcome'>🥉 Welcome, {user.data.firstname} {user.data.lastname} !</h2>
          <div className='profile'>
            <div className='profileImg'>
              <img src={`http://172.10.7.55/public/images/${user.data.profileImage}`} alt={`${user.data.firstname} profile`} />
            </div>
            <p className='oneliner'>{user.data.oneliner}</p>
            <p className='tiertext'>Your tier is <span className='tier'>Bronze 🥉</span></p>
            <div className='divider1'></div>
            <div className='ctn'>
              <p className='contentnum'>Number of Contents</p>
              <p className='num'>num</p>
            </div>
            <div className='divider2'></div>
            <div className='vcn'>
              <p className='vocabnum'>Saved Words</p>
              <p className='num'>{words.length}</p>
            </div>
          </div>
          <div className='wordContainer'>
            {words.map((word, index) => (
              <div key={index} className='wordEntry'>
                <p className='languageLabel'>English</p>
                <p className='definitionLabel'>Korean</p>
                <div className='divider'></div>
                <p className='word'>{word.word}</p>
                <p className='definition'>{word.definition}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default Mypage;