import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; // useNavigate 임포트
import './css/JobSelection.css'; // CSS 파일 임포트

const JobSelection = () => {
  const jobs = [
    { label: "기획·전략", subJobs: ["게임기획", "경영기획", "광고기획"] },
    { label: "마케팅·홍보·조사", subJobs: ["광고PD", "광고마케팅"] },
    { label: "회계·세무·재무", subJobs: ["감사", "경리"] },
    { label: "인사·노무·HRD", subJobs: ["노무사", "인사"] },
    { label: "총무·법무·사무", subJobs: ["법률사무원", "법무"] },
    { label: "IT개발·데이터", subJobs: ["TEST1", "TEST2"] },
    { label: "디자인", subJobs: ["TEST1", "TEST2"] },
    { label: "영업·판매·무역", subJobs: ["TEST1", "TEST2"] },
    { label: "고객상담·TM", subJobs: ["TEST1", "TEST2"] },
    { label: "구매·자재·물류", subJobs: ["TEST1", "TEST2"] },
    { label: "상품기획·MD", subJobs: ["TEST1", "TEST2"] },
    { label: "운전·운송·배송", subJobs: ["TEST1", "TEST2"] },
    { label: "서비스", subJobs: ["TEST1", "TEST2"] },
    { label: "생산", subJobs: ["TEST1", "TEST2"] },
    { label: "건설·건축", subJobs: ["TEST1", "TEST2"] },
    { label: "의료", subJobs: ["TEST1", "TEST2"] },
    { label: "연구·R&D", subJobs: ["TEST1", "TEST2"] },
    { label: "교육", subJobs: ["TEST1", "TEST2"] },
    { label: "미디어·문화·스포츠", subJobs: ["TEST1", "TEST2"] },
    { label: "금융·보험", subJobs: ["TEST1", "TEST2"] },
    { label: "공공·복지", subJobs: ["TEST1", "TEST2"] },
  ];

  const [selectedJob, setSelectedJob] = useState(null); // 선택된 직무를 하나만 저장
  const [hoveredJob, setHoveredJob] = useState(null); // 마우스 오버된 직무 저장
  const [selectedSubJob, setSelectedSubJob] = useState({}); // 선택된 하위 직무 저장
  const navigate = useNavigate(); // useNavigate 훅 사용

  // 하위 직무 선택을 토글하는 함수
  const toggleSubJobSelection = (jobLabel, subJob) => {
    if (selectedJob === subJob) {
      // 선택된 하위 직무를 다시 클릭하면 비활성화 (기획·전략으로 복원)
      setSelectedSubJob((prev) => ({ ...prev, [jobLabel]: null }));
      setSelectedJob(null);
    } else {
      // 하위 직무 선택 시 활성화, 이전 선택 해제
      setSelectedSubJob((prev) => ({ ...prev, [jobLabel]: subJob }));
      setSelectedJob(subJob);
    }
  };

  // "다음" 버튼을 눌렀을 때 실행되는 함수
  const handleNextClick = () => {
    if (!selectedJob) {
      alert("하나 이상의 직무를 선택해 주세요.");
    } else {
      // 직무가 선택되면 /jobresume 페이지로 이동
      navigate('/jobresume');
      console.log("선택된 직무 ->", selectedJob);
    }
  };

  return (
    <div className="JobSelect_container">
      <h1>직무선택</h1>
      <p>자신이 준비하고자 하는 직무를 선택해주세요.</p>
      <div className="jobGrid">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="jobContainer"
            onMouseEnter={() => setHoveredJob(job.label)}
            onMouseLeave={() => setHoveredJob(null)}
          >
            <button
              className="jobButton"
              style={{
                backgroundColor: selectedSubJob[job.label] && selectedJob === selectedSubJob[job.label] ? "#A7C7E7" : "#f0f0f0",
              }}
            >
              {selectedSubJob[job.label] || job.label}
            </button>

            {/* 모든 직무에 대해 드롭다운 표시 */}
            {hoveredJob === job.label && (
              <div className="subJobDropdown">
                {job.subJobs.map((subJob, subIndex) => (
                  <div
                    key={subIndex}
                    className="subJobItem"
                    onClick={() => toggleSubJobSelection(job.label, subJob)}
                  >
                    {subJob}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 아래 고정된 버튼과 광고 배너 텍스트 */}
      <div className="fixedBottom">
        <p className="banner">전문가에게 맡기는 면접 코치 AI 서비스</p>
        <button
          onClick={handleNextClick}
          className="nextButton"
          disabled={!selectedJob} // 직무 선택이 없으면 버튼 비활성화
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default JobSelection;