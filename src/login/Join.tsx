import React, { useState, useRef } from 'react';
import './Join.css'; // CSS 파일 임포트

const Join: React.FC = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [oneliner, setOneliner] = useState('');
    const [profileImage, setProfileImage] = useState<null | File>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // 로그인 로직 처리
        // 서버에 로그인 요청을 보내는 로직을 여기에 구현하세요.
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setProfileImage(file);

            // 이미지 미리보기 생성
            const reader = new FileReader();
            reader.onload = () => setPreviewUrl(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleClick = () => {
        // 숨겨진 파일 입력 활성화
        fileInputRef.current?.click();
    };

    return (
        <div className="Join">
            <form className="join-form" onSubmit={handleSubmit}>
                <h1>JOIN to Scenglish</h1>
                <div className='image-group'>
                    <label>Profile Image</label>
                    {previewUrl ? (
                        <img src={previewUrl} alt="Profile preview" className='profile-preview' />
                    ) : (
                        <div className="profile-placeholder" onClick={handleClick}></div>
                    )}
                    <input
                        type='file'
                        id='profile-image'
                        name='profileImage'
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                    />
                </div>
                <div className='name-group'>
                    <div className='join-group'>
                        <label htmlFor='firstname'>First Name</label>
                        <input
                            type='text'
                            id='firstname'
                            name='firstname'
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                        />
                    </div>
                    <div className='join-group'>
                        <label htmlFor='lastname'>Last Name</label>
                        <input
                            type='text'
                            id='lastname'
                            name='lastname'
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                        />
                    </div>
                    
                </div>
                <div className='join-group'>
                    <label htmlFor='oneliner'>One-Liner</label>
                    <input
                        type='text'
                        id='oneliner'
                        name='oneliner'
                        value={oneliner}
                        onChange={(e) => setOneliner(e.target.value)}
                    />
                </div>
                <div className='join-group'>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='text'
                        id='email'
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="join-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="join-group">
                    <label htmlFor="confirm">Confirm Password</label>
                    <input 
                        type="password" 
                        id="confirm" 
                        name="confirm" 
                        value={confirm} 
                        onChange={(e) => setConfirm(e.target.value)}
                    />
                </div>
                <div className='create'>
                    <button type="submit">Create Account</button>
                </div>
            </form>
        </div>
  );
}

export default Join;