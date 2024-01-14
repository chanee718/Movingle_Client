import React, { useState, useEffect } from 'react';
import Carousel from './Carousel';
import axios from 'axios';

const Main: React.FC = () => {
    const [movies, setMovies] = useState<any[]>([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('http://172.10.7.55:80/quotes/getTotal');
                setMovies(response.data); // 가정: 응답 데이터가 이미지 URL 목록
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchImages();
    }, []);
    
    return (
        <>
            <Carousel carouselList={movies} />
            {/* <Carousel carouselList={CAROUSEL_IMAGES} /> */}
        </>
        
    );
}

export default Main;