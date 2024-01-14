import React from 'react';
import Carousel from './Carousel';

const Main: React.FC = () => {
    const CAROUSEL_IMAGES = [
        "https://image.tmdb.org/t/p/w500//jE5o7y9K6pZtWNNMEw3IdpHuncR.jpg",
        "https://image.tmdb.org/t/p/w500//2e853FDVSIso600RqAMunPxiZjq.jpg",
        "https://image.tmdb.org/t/p/w500//f5f3TEVst1nHHyqgn7Z3tlwnBIH.jpg",
        "https://image.tmdb.org/t/p/w500//lBm8kh5iucqthRYo9jhsDaJHPJ7.jpg",
        "https://image.tmdb.org/t/p/w500//7BpNtNfxuocYEVREzVMO75hso1l.jpg",
        "https://image.tmdb.org/t/p/w500//ikQG3byEFyfwcnF0zmyNtXTmr5v.jpg",
        "https://image.tmdb.org/t/p/w500//2vuzIelhRZiAAChjadLywhYd1Zu.jpg",
        "https://image.tmdb.org/t/p/w500//mBaXZ95R2OxueZhvQbcEWy2DqyO.jpg",
        "https://image.tmdb.org/t/p/w500//ruujFw7J0Nd3BSjbN3QODym82Qs.jpg",
        "https://image.tmdb.org/t/p/w500//a6syn9qcU4a54Lmi3JoIr1XvhFU.jpg",
        "https://image.tmdb.org/t/p/w500//8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
        "https://image.tmdb.org/t/p/w500//uuitWHpJwxD1wruFl2nZHIb4UGN.jpg",
        "https://image.tmdb.org/t/p/w500//ui4DrH1cKk2vkHshcUcGt2lKxCm.jpg",
        "https://image.tmdb.org/t/p/w500//pD6sL4vntUOXHmuvJPPZAgvyfd9.jpg",
        "https://image.tmdb.org/t/p/w500//mlHDJE9sE3quNRr6bVULfOrIU7S.jpg",
        "https://image.tmdb.org/t/p/w500//bkpPTZUdq31UGDovmszsg2CchiI.jpg",
        "https://image.tmdb.org/t/p/w500//1AnXfjxFqMsQmUPSvt9YxUJhfFw.jpg",
        "https://image.tmdb.org/t/p/w500//qjhahNLSZ705B5JP92YMEYPocPz.jpg",
        "https://image.tmdb.org/t/p/w500//uDCeELWWpsNq7ErM61Yuq70WAE9.jpg",
    ]
    return (
        <div>
            <Carousel carouselList={CAROUSEL_IMAGES} />
        </div>
    );
}

export default Main;