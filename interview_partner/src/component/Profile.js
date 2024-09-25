import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('example@example.com');
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [profileImage, setProfileImage] = useState('/path/to/default-profile-image.jpg');

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
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        // Here you would typically send the updated data to a server
        console.log('Saving profile:', { name, email, profileImage });
        setIsEditingEmail(false);
    };

    const handleCancel = () => {
        // Reset to original values or do nothing
        setIsEditingEmail(false);
    };

    return (
        <div className="profile-container">
            <div className="search-bar">
                <div className="view-controls">
                    <span className="list-view"></span>
                    <span className="grid-view"></span>
                </div>
            </div>

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
                                style={{ display: 'none' }}
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
                            <input
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        ) : (
                            <input type="email" value={email} readOnly />
                        )}
                        <button className="edit-button" onClick={toggleEmailEdit}>
                            {isEditingEmail ? '완료' : '이메일 수정'}
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