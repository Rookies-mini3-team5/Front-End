import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "./UserProvider"; // useUser 훅 불러오기
import "./Profile.css";

const Profile = () => {
  const { currentUser, setCurrentUser } = useUser(); // useUser에서 currentUser와 setCurrentUser 가져오기
  const [name, setName] = useState(currentUser?.name || ""); // 초기값을 currentUser에서 가져옴
  const [email, setEmail] = useState(currentUser?.email || ""); // 초기값을 currentUser에서 가져옴
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [profileImage, setProfileImage] = useState(
    "/path/to/default-profile-image.jpg"
  );
  const [newProfileImage, setNewProfileImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user profile info from server
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/mypage`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        const { name, email } = response.data.body;
        setName(name);
        setEmail(email);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
        alert("프로필 정보를 불러오는 중 오류가 발생했습니다.");
      });

    // Get profile picture from server
    axios({
      url: `${process.env.REACT_APP_API_BASE_URL}/mypage/picture`,
      method: "GET",
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        const url = URL.createObjectURL(response.data);
        setProfileImage(url);
      })
      .catch((error) => {
        console.error("Error fetching profile image:", error);
        alert("프로필 사진을 불러오는 중 오류가 발생했습니다.");
      });
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const toggleEmailEdit = () => {
    setIsEditingEmail(!isEditingEmail);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // 미리보기 이미지 설정
      };
      reader.readAsDataURL(file);
      setNewProfileImage(file); // 실제 업로드할 파일 저장
    }
  };

  const handleSave = () => {
    // FormData를 사용해 프로필 수정 요청 보내기
    const formData = new FormData();
    const data = JSON.stringify({ name, email });
    formData.append("data", new Blob([data], { type: "application/json" }));
  
    // 파일이 존재하는 경우 추가
    if (newProfileImage) {
      formData.append("file", newProfileImage);
    }
  
    axios
      .patch(`${process.env.REACT_APP_API_BASE_URL}/mypage`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        alert("프로필이 성공적으로 업데이트되었습니다.");

        // 전역 상태를 업데이트하여 Home에서 이름이 자동으로 새로고침되도록 함
        const updatedUser = { ...currentUser, name, email };
        setCurrentUser(updatedUser);

        // localStorage에 업데이트된 사용자 정보 저장
        localStorage.setItem("user", JSON.stringify(updatedUser));

        setIsEditingEmail(false);
        navigate("/"); // 저장 후 메인 페이지로 이동
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        alert("프로필 업데이트 중 오류가 발생했습니다.");
      });
  };

  const handleCancel = () => {
    setIsEditingEmail(false);
    navigate("/");
  };

  return (
    <div className="profile-container">
      <div className="profile-content">
        <div className="profile-section">
          <h3>프로필 사진 업데이트</h3>
          <div className="profile-image-container">
            <img src={profileImage} alt="프로필 이미지" />
            <div className="image-upload-controls">
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
              <label htmlFor="imageUpload" className="upload-button">
                사진 변경
              </label>
              <p>최소 사이즈: 300x300px</p>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h3>연락처 정보</h3>
          <div className="input-group">
            <label>이름</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div className="input-group">
            <label>이메일 주소</label>
            {isEditingEmail ? (
              <input type="email" value={email} onChange={handleEmailChange} />
            ) : (
              <input type="email" value={email} readOnly />
            )}
            <button className="edit-button" onClick={toggleEmailEdit}>
              {isEditingEmail ? "완료" : "이메일 수정"}
            </button>
          </div>
        </div>

        <div className="button-group">
          <button className="cancel-button" onClick={handleCancel}>
            취소
          </button>
          <button className="save-button" onClick={handleSave}>
            변경 사항 저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
