import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from './UserProvider';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setCurrentUser } = useUser();

    const handleLogin = async () => {
        try {
            const response = await axios.post('/user/login', { username, password });
            console.log('로그인 성공:', response.data);
            // 받아온 사용자 데이터에서 필요한 정보만 저장
            const userData = {
                id: response.data.id,
                username: response.data.username,
                name: response.data.name,
                email: response.data.email,
                role: response.data.role
            };
            setCurrentUser(userData);
            localStorage.setItem('user', JSON.stringify(userData)); // 로컬 스토리지에 사용자 정보 저장
            alert('로그인 성공!');
            navigate('/');
        } catch (error) {
            console.error('로그인 실패:', error);
            if (error.response && error.response.status === 401) {
                alert('아이디 또는 비밀번호가 잘못되었습니다.');
            } else {
                alert('로그인에 실패했습니다. 다시 시도해주세요.');
            }
        }
    };

    return (
        <div className="home-container">
            <div className="info-section">
                <h2 className="info-main-title">다시 오셨군요!</h2>
                <h3 className="info-subtitle">GPT AI면접 코치</h3>
                <div className="info-image">
                    <img src="/path-to-your-image.png" alt="GPT AI 면접 코치" />
                </div>
                <p className="info-text">로그인하고 AI 면접 코치와 함께 연습을 시작하세요!</p>
            </div>

            <div className="login-box">
                <h3 className="login-title">로그인</h3>
                <p className="login-subtitle">계정이 없으신가요? <a href="/register">회원가입하세요</a>.</p>
                <input
                    className="login-input"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className="login-input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="login-button" onClick={handleLogin}>로그인</button>
                <div className="login-footer">
                    <p>또는 다음으로 로그인</p>
                    <div className="social-buttons">
                        <button className="social-button google">Google</button>
                        <button className="social-button facebook">페이스북</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;