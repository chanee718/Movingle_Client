import React, { useState, useEffect } from 'react';
import Carousel from './Carousel';
import axios from 'axios';
import './Main.css';

const Main: React.FC = () => {
    const [movies, setMovies] = useState<any[]>([]);
    const [newMovies, setNewMovies] = useState<any[]>([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('http://172.10.7.55:80/quotes/getTotal');
                setMovies(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchImages();
    }, []);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('http://172.10.7.55:80/quotes/getNewTotal');
                setNewMovies(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchImages();
    }, []);

    
    return (
        <div className="main-container">
            <h2 className="white-text">New Movies on Movingle!✨</h2>
            <Carousel carouselList={newMovies} />
            <h2 className="white-text">Various Movies on Movingle!🌟</h2>
            <Carousel carouselList={movies} />
        </div>
    );
}

export default Main;