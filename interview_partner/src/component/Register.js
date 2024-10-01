import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "./UserProvider";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const { setCurrentUser } = useUser();
  const imageBaseUrl = process.env.REACT_APP_IMAGE_URL;

  const handleRegister = async () => {
    if (password !== repeatPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const registerData = {
      username,
      password,
      name,
      email,
      role: "user", // 기본 역할을 'user'로 설정
    };

    try {
      // FormData 객체를 사용하여 데이터를 담습니다.
      const formData = new FormData();
      formData.append("data", new Blob([JSON.stringify(registerData)], { type: "application/json" }));
    
      // 파일이 있다면 formData에 파일도 추가
      // 파일을 업로드하지 않으면 null로 처리, 빈 파일 전송을 피하기 위해 조건을 추가
      formData.append("file", null); 

      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/open-api/join`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("회원가입 성공:", response.data);
      alert("회원가입 성공!");
      navigate("/login");
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="home-container">
      <div className="info-section">
        <h2 className="info-main-title">기회를 탐색하고 계신가요?</h2>
        <h3 className="info-subtitle">GPT AI면접 코치</h3>
        <div className="info-image">
          <img src={`${imageBaseUrl}/ai.png`} alt="GPT AI 면접 코치" />
        </div>
        <p className="info-text">이동 중에도 구인공고에 접속하세요!</p>
      </div>

      <div className="register-box">
        <h3 className="register-title">구직자</h3>
        <p className="register-subtitle">
          이미 계정이 있으신가요? 로그인하세요.
        </p>
        <p className="register-instruction">무료로 시작하세요</p>
        <input
          className="register-input"
          type="text"
          placeholder="Your ID"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
          placeholder="Your unique Nickname"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
        <button className="register-button" onClick={handleRegister}>
          가입하기
        </button>
      </div>
    </div>
  );
};

export default Register;
