import { useEffect, useRef, useState } from 'react';
import styles from './carousel.module.css';
import { ReactComponent as Left } from "../images/left.svg"
import { ReactComponent as Right } from "../images/right.svg"

interface Props {
  carouselList: string[]
}

const Carousel = ({ carouselList }: Props) => {
  const [currIndex, setCurrIndex] = useState(1)     // 현재 슬라이드의 index
  const [currList, setCurrList] = useState<string[]>()      

  const carouselRef = useRef<HTMLUListElement>(null)


  useEffect(() => {
    if (carouselRef.current) {
      const carousel = carouselRef.current; // Ref에서 carousel 요소 가져오기
      const itemWidth = carousel.clientWidth / 7; // 7개 항목의 각 너비
      const totalMargin = 20; // 10px * 2, 각 항목의 총 마진
      const moveDistance = itemWidth + totalMargin; // 한 항목의 너비 + 마진
      const movePercentage = (moveDistance / carousel.clientWidth) * 100; // 전체 너비 대비 이동 비율(%)
  
      carousel.style.transform = `translateX(-${currIndex * movePercentage}%)`;
    }
  }, [currIndex, carouselRef]);   //currIndex가 변경될 때마다 translateX

  useEffect(() => {
    if (carouselList.length !== 0) {
      const startImages = carouselList.slice(-7); // Get the last 7 images
      const endImages = carouselList.slice(0, 7); // Get the first 7 images
      const newList = [...startImages, ...carouselList, ...endImages];
  
      setCurrList(newList);
      setCurrIndex(7); // 중간 부분에서 시작
    }
  }, [carouselList]);
  
  const handleSwipe = (direction: number) => {
    const newIndex = currIndex + direction;
    const length = carouselList.length;
  
    if (newIndex > length + 6) {
      setCurrIndex(7);
    } else if (newIndex < 7) {
      setCurrIndex(length + 6);
    } else {
      setCurrIndex(newIndex);
    }
  
    if (carouselRef.current) {
      carouselRef.current.style.transition = 'all 0.5s ease-in-out';
    }
  };

  return (
    <div className={styles.container}>
        
      {/* 왼쪽으로 이동하는 버튼 */}
      <button type='button' className={styles.swipeLeft} onClick={() => handleSwipe(-1)}>
        <Left style={{ width: '50px', height: '50px', objectFit: 'cover'}} />
      </button>
      {/* 오른쪽으로 이동하는 버튼 */}
      <button type='button' className={styles.swipeRight} onClick={() => handleSwipe(1)}>
        <Right style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
      </button>
      <div
        className={styles.carouselWrapper}
      >
        {/* 캐러셀 내에 들어갈 이미지들 */}
        <ul className={styles.carousel} ref={carouselRef}>
          {currList?.map((image, idx) => {
            const key = `${image}-${idx}`

            return (
              <li key={key} className={styles.carouselItem}>
                <img src={image} alt='carousel-img' />
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Carousel