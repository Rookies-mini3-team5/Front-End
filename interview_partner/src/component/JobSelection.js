import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './css/JobSelection.css';

const JobSelection = () => {
  const [jobs, setJobs] = useState([]); // API에서 받은 직군 목록 저장
  const [subJobsMap, setSubJobsMap] = useState({}); // 각 직군에 대한 하위 직무 저장
  const [hoveredJob, setHoveredJob] = useState(null); // 현재 마우스를 올려놓은 직군을 저장
  const [selectedJobId, setSelectedJobId] = useState(null); // 선택된 직무 ID 저장
  const [selectedJobName, setSelectedJobName] = useState(null); // 선택된 직무 이름 저장
  const [selectedSubJob, setSelectedSubJob] = useState({}); // 직군별로 선택된 하위 직무 저장
  const [selectedOccupationalId, setSelectedOccupationalId] = useState(null); // 선택된 직군 ID 저장
  const [selectedOccupationalName, setSelectedOccupationalName] = useState(null); // 선택된 직군 이름 저장
  const navigate = useNavigate(); // useNavigate 훅 사용

  // useEffect를 사용해 직군 데이터를 가져옴
  useEffect(() => {
    fetch('http://localhost:8080/open-api/occupational')
      .then(response => response.json())
      .then(data => {
        setJobs(data.body.occupationalList); // API 응답 구조에 맞게 데이터 저장
      })
      .catch(error => console.error('Error fetching jobs:', error));
  }, []);

  // 하위 직무 데이터 로드
  const fetchSubJobs = (occupationalId) => {
    // 하위 직무가 아직 로드되지 않은 경우에만 API 호출
    if (!subJobsMap[occupationalId]) {
      fetch(`http://localhost:8080/open-api/occupational/${occupationalId}`)
        .then(response => response.json())
        .then(data => {
          setSubJobsMap(prev => ({ ...prev, [occupationalId]: data.body.jobList }));
        })
        .catch(error => console.error('Error fetching sub-jobs:', error));
    }
  };

  // 하위 직무 선택을 토글하는 함수
  const toggleSubJobSelection = (occupationalId, subJobId, subJobName, occupationalName) => {
    if (selectedJobId === subJobId) {
      // 선택된 하위 직무를 다시 클릭하면 비활성화
      setSelectedSubJob((prev) => ({ ...prev, [occupationalId]: null }));
      setSelectedJobId(null);  // 직무 ID 초기화
      setSelectedJobName(null); // 직무 이름 초기화
      setSelectedOccupationalId(null);  // 직군 ID 초기화
      setSelectedOccupationalName(null);  // 직군 이름 초기화
    } else {
      // 하위 직무 선택 시 활성화, 이전 선택 해제
      setSelectedSubJob((prev) => ({ ...prev, [occupationalId]: subJobId }));
      setSelectedJobId(subJobId);  // 직무 ID 설정
      setSelectedJobName(subJobName);  // 직무 이름 설정
      setSelectedOccupationalId(occupationalId);  // 직군 ID 설정
      setSelectedOccupationalName(occupationalName);  // 직군 이름 설정

      // 추가된 로그: 선택된 값들을 콘솔에 출력하여 확인 가능
      console.log("Selected Occupational ID:", occupationalId);
      console.log("Selected SubJob ID:", subJobId);
      console.log("Selected Occupational Name:", occupationalName);
      console.log("Selected SubJob Name:", subJobName);
    }
  };

  // 직무 선택 후 POST 요청
  const handleNextClick = () => {
    const token = localStorage.getItem("token");  // 저장된 JWT 토큰 가져오기

    if (!selectedJobId || !selectedOccupationalId) {  // 직무 및 직군 ID가 선택되지 않으면 경고
      alert("하나 이상의 직무를 선택해 주세요.");
    } else {
      // POST 요청
      fetch('http://localhost:8080/api/section', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  // JWT 토큰을 Authorization 헤더에 포함
        },
        body: JSON.stringify({
          occupational: selectedOccupationalId,  // 선택된 직군 ID 전송
          job: selectedJobId  // 선택된 직무 ID 전송
        }),
      })
      .then(response => response.json())
      .then(data => {
        if (data.result && data.result.resultCode === 200) {
          const sectionId = data.body.id; // 서버에서 받은 섹션 ID
          console.log("POST 성공:", data);

          // 섹션 ID를 JobResume 페이지로 넘기면서 이동
          navigate('/jobresume', { state: { sectionId } });
        } else {
          console.log("POST 실패:", data);
          alert('직무 선택에 실패했습니다. 다시 시도해 주세요.');
        }
      })
      .catch(error => {
        console.error('Error posting job:', error);
        alert('직무 선택 중 오류가 발생했습니다.');
      });
    }
  };

  return (
    <div className="JobSelect_container">
      <h1 className="common-title">직무선택</h1>
      <p className="common-text">자신이 준비하고자 하는 직무를 선택해주세요.</p>
      <div className="jobGrid">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="jobContainer"
            onMouseEnter={() => {
              setHoveredJob(job.occupationalName); // 마우스를 올렸을 때 직군 저장
              fetchSubJobs(job.id); // 하위 직무 가져오기
            }}
            onMouseLeave={() => setHoveredJob(null)} // 마우스를 뗐을 때 직군 초기화
          >
            <button
              className="jobButton"
              style={{
                backgroundColor: selectedSubJob[job.id] && selectedJobId === selectedSubJob[job.id] ? "#A7C7E7" : "#f0f0f0",
              }}
            >
              {/* 선택된 하위 직무가 있으면 하위 직무 이름을 표시하고, 그렇지 않으면 직군 이름을 표시 */}
              {selectedSubJob[job.id] ? selectedJobName : job.occupationalName}
            </button>

            {/* 마우스를 올렸을 때만 하위 직무 드롭다운 표시 */}
            {hoveredJob === job.occupationalName && subJobsMap[job.id] && (
              <div className="subJobDropdown">
                {subJobsMap[job.id].map((subJob, subIndex) => (
                  <div
                    key={subIndex}
                    className="subJobItem"
                    onClick={() => toggleSubJobSelection(job.id, subJob.id, subJob.jobName, job.occupationalName)} // 변경됨: 직군 및 직무 ID와 이름 전달
                  >
                    {subJob.jobName}
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
          disabled={!selectedJobId} // 직무 선택이 없으면 버튼 비활성화
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default JobSelection;