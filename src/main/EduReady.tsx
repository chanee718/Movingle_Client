import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EduReady.css';
import './Education';
import axios from 'axios';
import { InputLabel, MenuItem, FormControl, Button } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { School } from '@mui/icons-material';

const EduReady: React.FC = () => {
  let { id } = useParams();
  const [movieinfo, setMovieinfo] = useState<any[]>([]);
  const [selectedNumber, setSelectedNumber] = useState<number>(5);

  const navigate = useNavigate();

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

  const handleEducation = () => {
      navigate(`/education`, { state: {id, selectedNumber} });
  }
  const handleSelectChange = (e: SelectChangeEvent) => {
    setSelectedNumber(parseInt(e.target.value));
  };
  const numbers = [5, 10, 15, 20];
  const availableNumbers = numbers.filter(number => number <= movieinfo.length);

  console.log(id);
  return (
    <div className='movie-card'>
      {movie && (
        <>
          <div className='movie-poster'>
            <img src={movie.poster_url} alt={`ID = ${id} 영화 포스터`} />
          </div>
          <div className='movie-content'>
            <h1>{movie.movie}</h1>
            <p className="release-date">{movie.release_date}</p>
            <h3 className='overview'>Overview</h3>
            <p className="movie-description">
              {movie.overview}
            </p>
            <div className='move'>
              <div className='quote-selector'>
                <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
                  <InputLabel 
                    id="demo-simple-select-helper-label" 
                    sx={{ 
                      textAlign: 'left', 
                      color: '#4E4351',
                      '&.Mui-focused': { // 포커스 상태일 때의 색상
                        color: '#4E4351',
                      },
                    }} 
                  >
                    Quotes
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={selectedNumber.toString()}
                    label="Number"
                    sx={{
                      color: 'black',
                      height: 40,
                      bgcolor: 'white',
                      '& .MuiSvgIcon-root': { // 드롭다운 아이콘 색상
                        color: 'grey',
                      },
                      '& .MuiOutlinedInput-notchedOutline': { // 선택 전 테두리 색상
                        borderColor: '#4E4351',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': { // 호버 시 테두리 색상
                        borderColor: '#4E4351',
                      },
                      // 포커스 상태일 때의 스타일 추가
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#4E4351',
                      }
                    }}
                    onChange={handleSelectChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {availableNumbers.map(number => (
                    <MenuItem value={number} sx={{color: "#302037"}}>{number} quotes</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className='btn'>
                <Button 
                  variant="contained" 
                  startIcon={<School />} 
                  onClick={handleEducation} 
                  sx={{
                    height: 40, 
                    bgcolor: '#4E4351',
                    '&:hover': {
                      bgcolor: '#302037', // 호버 시의 배경색상
                    },
                  }}
                >
                  Start
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EduReady;