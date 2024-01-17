import { useEffect, useRef, useState } from 'react';
import styles from './history.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as Left } from "../images/left.svg"
import { ReactComponent as Right } from "../images/right.svg"

interface Movie {
  movie: string;
  release_date: string;
  overview: string;
  poster_url: string;
  contents_id: string
}

interface Props {
  carouselList: Movie[]; // Props의 타입을 Movie 객체 배열로 변경
}

const History = ({ carouselList }: Props) => {
  const [currIndex, setCurrIndex] = useState(2)     // 현재 슬라이드의 index  
  const carouselRef = useRef<HTMLUListElement>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    updateLoginStatus();
  }, []);

  const updateLoginStatus = () => {
    const authToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    setIsLoggedIn(!!authToken);
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!isLoggedIn) {
      e.preventDefault(); // 기본 Link 동작 방지
      navigate('/login'); // 로그인 페이지로 이동
    }
    // 로그인이 되어 있으면 기본 동작 수행 (Link to={`/movie/${idx}`})
  };

  useEffect(() => {
    if (carouselRef.current) {
      const carousel = carouselRef.current; // Ref에서 carousel 요소 가져오기
      const itemWidth = carousel.clientWidth / 7; // 7개 항목의 각 너비
      const totalMargin = 5;
      const moveDistance = itemWidth + totalMargin; // 한 항목의 너비 + 마진
      const movePercentage = (moveDistance / carousel.clientWidth) * 100; // 전체 너비 대비 이동 비율(%)
      
      carousel.style.transition = 'transform 0.5s ease-in-out';
      carousel.style.transform = `translateX(-${currIndex * movePercentage}%)`;
    }
  }, [currIndex, carouselRef]);   //currIndex가 변경될 때마다 translateX
  
  const handleSwipe = (direction: number) => {
    const newIndex = currIndex + direction;
    const length = carouselList.length;
  
    if (newIndex >= 0 && newIndex <= length - 1) {
      setCurrIndex(newIndex);
    }
  };
  
  const showLeftButton = currIndex > 2;
  const showRightButton = currIndex < carouselList.length-1;

  return (
    <div className={styles.container}>
      {/* 왼쪽으로 이동하는 버튼 */}
      {showLeftButton && (
        <button type='button' className={styles.swipeLeft} onClick={() => handleSwipe(-1)}>
          <Left style={{ width: '50px', height: '50px', objectFit: 'cover'}} />
        </button>
      )}
      {/* 오른쪽으로 이동하는 버튼 */}
      {showRightButton && (
        <button type='button' className={styles.swipeRight} onClick={() => handleSwipe(1)}>
          <Right style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
        </button>
      )}
      <div
        className={styles.carouselWrapper}
      >
        {/* 캐러셀 내에 들어갈 이미지들 */}
        <ul className={styles.carousel} ref={carouselRef}>
          {carouselList?.map((movie, idx) => {
            const key = `${movie.contents_id}-${idx}`

            return (
              <li key={key} className={styles.carouselItem}>
                <Link to={`/movie/${movie.contents_id}`} onClick={handleClick}>
                  <img src={movie.poster_url} alt={`${movie.movie} poster`} />
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default History