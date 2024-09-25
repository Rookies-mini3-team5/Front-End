import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from './UserProvider';
import './Register.css';

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const { setCurrentUser } = useUser();

    const handleRegister = async () => {
        if (password !== repeatPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        const registerData = {
            username,
            password,
            name,
            email,
            role: 'user' // 기본 역할을 'user'로 설정
        };

        try {
            const response = await axios.post('/user', registerData);
            console.log('회원가입 성공:', response.data);
            alert('회원가입 성공!');
            navigate('/login');
        } catch (error) {
            console.error('회원가입 실패:', error);
            alert('회원가입에 실패했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <div className="home-container">
            <div className="info-section">
                <h2 className="info-main-title">기회를 탐색하고 계신가요?</h2>
                <h3 className="info-subtitle">GPT AI면접 코치</h3>
                <div className="info-image">
                    <img src="/path-to-your-image.png" alt="GPT AI 면접 코치" />
                </div>
                <p className="info-text">이동 중에도 구인공고에 접속하세요!</p>
            </div>

            <div className="register-box">
                <h3 className="register-title">구직자</h3>
                <p className="register-subtitle">이미 계정이 있으신가요? 로그인하세요.</p>
                <p className="register-instruction">무료로 시작하세요</p>
                <input
                    className="register-input"
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    className="register-input"
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="register-input"
                    type="text"
                    placeholder="Your unique username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className="register-input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    className="register-input"
                    type="password"
                    placeholder="Repeat password"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                />
                <button className="register-button" onClick={handleRegister}>가입하기</button>
                <div className="register-footer">
                    <p>또는 다음으로 회원가입</p>
                    <div className="social-buttons">
                        <button className="social-button google">Google</button>
                        <button className="social-button facebook">페이스북</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;