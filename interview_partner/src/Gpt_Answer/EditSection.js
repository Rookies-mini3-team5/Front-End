// 섹션, 이력, 강조점 수정하는 페이지

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./css/EditSectionPage.css"; // CSS 파일 import

const EditSection = () => {
  const [sectionData, setSectionData] = useState({
    name: "",
    resume: "",
    emphasize: "",
  });
  const navigate = useNavigate();
  const { sectionId } = useParams();

  useEffect(() => {
    const fetchSectionData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/section/${sectionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data.body) {
          setSectionData({
            name: response.data.body.sectionName || "",
            resume: response.data.body.resume || "",
            emphasize: response.data.body.emphasize || "",
          });
        }
      } catch (error) {
        console.error("Error fetching section data:", error);
      }
    };
    fetchSectionData();
  }, [sectionId]);

  const handleChange = (e) => {
    setSectionData({ ...sectionData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/api/section/${sectionId}`,
        sectionData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(sectionData);
      navigate("/"); // 수정 후 홈으로 이동
    } catch (error) {
      console.error("Error updating section:", error);
    }
  };

  // 취소 버튼 클릭 시 브라우저 뒤로가기 효과
  const handleCancel = () => {
    navigate(-1); // 뒤로 가기
  };

  return (
    <div className="edit-section-container">
      <form onSubmit={handleSubmit} className="edit-section-form">
        <h2>섹션 수정</h2>
        <label>
          섹션 이름
          <input
            type="text"
            name="name"
            value={sectionData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          이력
          <textarea
            type="text"
            name="resume"
            value={sectionData.resume}
            onChange={handleChange}
          />
        </label>
        <label>
          강조하고 싶은 점
          <textarea
            type="text"
            name="emphasize"
            value={sectionData.emphasize}
            onChange={handleChange}
          />
        </label>
        <div className="button-group">
          <button type="submit" className="submit-button">수정하기</button>
          <button type="button" className="cancel-button" onClick={handleCancel}>취소</button>
        </div>
      </form>
    </div>
  );
};

export default EditSection;
