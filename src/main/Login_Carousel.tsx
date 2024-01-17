import { useEffect, useRef, useState } from 'react';
import styles from './login.module.css';
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

const LoginCarousel = ({ carouselList }: Props) => {
  const [currIndex, setCurrIndex] = useState(0)     // 현재 슬라이드의 index  
  const carouselRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    // 자동 슬라이딩 로직
    const interval = setInterval(() => {
      setCurrIndex(prevIndex => {
        const newIndex = prevIndex + 1;
        return newIndex < carouselList.length ? newIndex : 0;
      });
    }, 3000); // 3초 간격으로 슬라이드 변경

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 정리
  }, [carouselList.length]);

  useEffect(() => {
    if (carouselRef.current) {
      const carousel = carouselRef.current; // Ref에서 carousel 요소 가져오기
      const moveDistance = 100;
      
      carousel.style.transition = 'transform 0.5s ease-in-out';
      carousel.style.transform = `translateX(-${(currIndex * (moveDistance - 8))}%)`;
    }
  }, [currIndex, carouselRef]);   //currIndex가 변경될 때마다 translateX
  
  const handleSwipe = (direction: number) => {
    const newIndex = currIndex + direction;
    const length = carouselList.length;
  
    if (newIndex >= 0 && newIndex <= length - 1) {
      setCurrIndex(newIndex);
    }
  };
  
  const showLeftButton = currIndex > 1;
  const showRightButton = currIndex < carouselList.length;

  useEffect(() => {
    const interval = setInterval(() => {
      if(showRightButton){
        handleSwipe(1); // 오른쪽으로 한 칸 이동
      }
    }, 3000); // 3초 간격

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 정리
  }, [currIndex]);

  return (
    <div className={styles.container}>
      <div
        className={styles.carouselWrapper}
      >
        {/* 캐러셀 내에 들어갈 이미지들 */}
        <ul className={styles.carousel} ref={carouselRef}>
          {carouselList?.map((movie, idx) => {
            const key = `${movie.contents_id}-${idx}`

            return (
              <li key={key} className={styles.carouselItem}>
                <img src={movie.poster_url} alt={`${movie.movie} poster`} />
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default LoginCarousel