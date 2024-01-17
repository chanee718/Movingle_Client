import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // CSS 파일 임포트
import axios from 'axios';
import Carousel from '../main/Login_Carousel';

const Login: React.FC<{ onLoginSuccess: () => void }> = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [movies, setMovies] = useState<any[]>([]);

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

    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        // 로그인 로직 처리
        const loginData = {
            email,
            password,
        };
        try {
            // 서버에 로그인 요청 보내기
            const response = await axios.post('http://172.10.7.55:80/login', loginData);
            // 로그인 성공 처리
            console.log('Login Successful:', response.data);

            if (remember) {
                localStorage.setItem('authToken', response.data.token); // 로컬 스토리지에 저장
                localStorage.setItem('loginMail', email);
            } else {
                sessionStorage.setItem('authToken', response.data.token); // 세션 스토리지에 저장
                sessionStorage.setItem('loginMail', email);
            }
            onLoginSuccess();
            navigate('/'); 
        } catch (error) {
            console.log(error);
            alert('The email or password do not match');
        }
    };

    const handleJoin = () => {
        navigate('/join')
    }

    return (
        <><div className="Login">
            <form className="login-form" onSubmit={handleSubmit}>
                <h1>LOGIN</h1>
                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='text'
                        id='email'
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="remember-me">
                    <input
                        type="checkbox"
                        id="remember"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)} />
                    <span></span>
                    <label htmlFor="remember"><span></span>Keep me signed in</label>
                    <button>
                        <span>Reset Password</span>
                    </button>
                </div>
                <div className='login'>
                    <button type="submit">Login</button>
                </div>
                <div className='join'>
                    <p>Don't have an account?</p>
                    <button onClick={handleJoin}>
                        <span>JOIN</span>
                    </button>
                </div>
            </form>
            <div className="carousel-container">
                <Carousel carouselList={movies} />
            </div>
            </div></>
    );
}

export default Login;