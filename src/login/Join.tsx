import React, { useState, useRef } from 'react';
import axios from "axios";
import './Join.css'; // CSS 파일 임포트

const Join: React.FC = () => {
    const [firstname, setFirstname] = useState<string>('');
    const [lastname, setLastname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirm, setConfirm] = useState<string>('');
    const [oneliner, setOneliner] = useState<string>('');
    const [profileImage, setProfileImage] = useState<null | File>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(true);
    
    const [hasfirstname, setHasfirstname] = useState<boolean>(true);
    const [haslastname, setHaslastname] = useState<boolean>(true);
    const [hasemail, setHasemail] = useState<boolean>(true);
    const [haspassword, setHaspassword] = useState<boolean>(true);
    const [hasoneliner, setHasoneliner] = useState<boolean>(true);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (password !== confirm) {
            setIsPasswordMatch(false); // 비밀번호가 일치하지 않으면 요청을 보내지 않음
        } else {
            setIsPasswordMatch(true);
        }
        //firstname이 입력되었는지 확인
        if (firstname === ''){
            setHasfirstname(false);
        } else setHasfirstname(true);
        //lastname이 입력되었는지 확인
        if (lastname === ''){
            setHaslastname(false);
        } else setHaslastname(true);
        //email이 입력되었는지 확인
        if (email === ''){
            setHasemail(false);
        } else setHasemail(true);
        //password가 입력되었는지 확인
        if (password === ''){
            setHaspassword(false);
        } else setHaspassword(true);
        //onliner가 입력되었는지 확인
        if (oneliner === ''){
            setHasoneliner(false);
        } else setHasoneliner(true);

        if (!hasfirstname && !haslastname && !hasemail && !hasoneliner && !haspassword) return;

        //서버에 보낼 data 정의
        const formData = new FormData();
        
        if (profileImage) {
            formData.append('profileImage', profileImage);
        }
        formData.append('firstname', firstname);
        formData.append('lastname', lastname);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('oneliner', oneliner);

        try {
            const response = await axios.post('http://localhost:3000/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            // 여기에서 서버로부터 반환된 이미지 URL을 처리할 수 있습니다.
        } catch (error) {
            console.error('There was an error!', error);
        }
        
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
                            style={{ borderColor: hasfirstname ? '' : 'red' }}
                        />
                        {!hasfirstname && <div className='warning'>Missing First Name!</div>}
                    </div>
                    <div className='join-group'>
                        <label htmlFor='lastname'>Last Name</label>
                        <input
                            type='text'
                            id='lastname'
                            name='lastname'
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            style={{ borderColor: haslastname ? '' : 'red' }}
                        />
                        {!haslastname && <div className='warning'>Missing Last Name!</div>}
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
                        style={{ borderColor: hasoneliner ? '' : 'red' }}
                    />
                    {!hasoneliner && <div className='warning'>Missing One-liner!</div>}
                </div>
                <div className='join-group'>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='text'
                        id='email'
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ borderColor: hasemail ? '' : 'red' }}
                    />
                    {!hasemail && <div className='warning'>Missing email!</div>}
                </div>
                <div className="join-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ borderColor: haspassword ? '' : 'red' }}
                    />
                    {!haspassword && <div className='warning'>Missing Password!</div>}
                </div>
                <div className="join-group">
                    <label htmlFor="confirm">Confirm Password</label>
                    <input 
                        type="password" 
                        id="confirm" 
                        name="confirm" 
                        value={confirm} 
                        onChange={(e) => setConfirm(e.target.value)}
                        style={{ borderColor: isPasswordMatch ? '' : 'red' }}
                    />
                    {!isPasswordMatch && <div className='warning'>Passwords do not match</div>}
                </div>
                <div className='create'>
                    <button type="submit">Create Account</button>
                </div>
            </form>
        </div>
  );
}

export default Join;