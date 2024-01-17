import React, { useState, useEffect } from 'react';
import Carousel from './Carousel';
import axios from 'axios';
import './Main.css';

const Main: React.FC = () => {
    const [movies, setMovies] = useState<any[]>([]);
    const [newMovies, setNewMovies] = useState<any[]>([]);
    const [popularMovies, setPopularMovies] = useState<any[]>([]);

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

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('http://172.10.7.55:80/quotes/getPopularTotal');
                setPopularMovies(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchImages();
    }, []);
    
    return (
        <div>
            <img src={require('../images/main.png')} alt="Logo" width="1430vh" height="750vh"/>
            <div className='main'>
                <div className="main-container">
                    <div className="section">
                        <h2 className="white-text">New Movies on Movingle</h2>
                        <Carousel carouselList={newMovies} />
                    </div>
                    <div className="section">
                        <h2 className="white-text">Popular Movies on Movingle</h2>
                        <Carousel carouselList={popularMovies} />
                    </div>
                    <div className="section">
                        <h2 className="white-text">Various Movies on Movingle</h2>
                        <Carousel carouselList={movies} />
                    </div>
                </div>
            </div>
        </div>
    );
    
}

export default Main;