import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import './Login.css'; // CSS 파일 임포트

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // 로그인 로직 처리
        console.log('로그인 시도: ', email, password);
        // 서버에 로그인 요청을 보내는 로직을 여기에 구현하세요.
    };

    const handleJoin = () => {
        navigate('/join')
    }

    return (
        <div className="Login">
            <form className="login-form" onSubmit={handleSubmit}>
                <h1>LOGIN</h1>
                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='text'
                        id='email'
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="remember-me">
                    <input 
                        type="checkbox" 
                        id="remember" 
                        checked={remember} 
                        onChange={(e) => setRemember(e.target.checked)}
                    />
                    <span></span>
                    <label htmlFor="remember"><span></span> Keep me signed in</label>
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
        </div>
    );
}

export default Login;