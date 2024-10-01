import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "./UserProvider";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setCurrentUser, setToken } = useUser();
  const imageBaseUrl = process.env.REACT_APP_IMAGE_URL;

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/open-api/login`, { username, password });
      console.log("로그인 성공:", response.data);
  
      const token = response.data.body.token;  // 응답에서 JWT 토큰 추출

      // 받아온 사용자 데이터에서 필요한 정보만 저장
      const userData = {
        id: response.data.body.id,
        username: response.data.body.username,
        name: response.data.body.name,
        email: response.data.body.email,
        role: response.data.body.role,
      };
      setCurrentUser(userData);
      setToken(token);
      localStorage.setItem("token", token);  // JWT 토큰 저장
      localStorage.setItem("user", JSON.stringify(userData));  // 사용자 정보 저장

      alert("로그인 성공!");
      navigate("/");
    } catch (error) {
      console.error("로그인 실패:", error);
      if (error.response && error.response.status === 401) {
        alert("아이디 또는 비밀번호가 잘못되었습니다.");
      } else {
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <div className="home-container">
      <div className="info-section">
        <h2 className="info-main-title">다시 오셨군요!</h2>
        <h3 className="info-subtitle">GPT AI면접 코치</h3>
        <div className="info-image">
          <img src={`${imageBaseUrl}/ai.png`} alt="GPT AI 면접 코치" />
        </div>
        <p className="info-text">
          로그인하고 AI 면접 코치와 함께 연습을 시작하세요!
        </p>
      </div>

      <div className="login-box">
        <h3 className="login-title">로그인</h3>
        <p className="login-subtitle">
          계정이 없으신가요? <a href="/register">회원가입하세요</a>.
        </p>
        <input
          className="login-input"
          type="text"
          placeholder="Your ID"
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
        <button className="login-button" onClick={handleLogin}>
          로그인
        </button>
      </div>
    </div>
  );
};

export default Login;