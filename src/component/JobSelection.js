import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './css/JobSelection.css';

const JobSelection = () => {
  // const jobs = [
  //   { label: "기획·전략", subJobs: ["게임기획", "경영기획", "광고기획"] },
  //   { label: "마케팅·홍보·조사", subJobs: ["광고PD", "광고마케팅"] },
  //   { label: "회계·세무·재무", subJobs: ["감사", "경리"] },
  //   { label: "인사·노무·HRD", subJobs: ["노무사", "인사"] },
  //   { label: "총무·법무·사무", subJobs: ["법률사무원", "법무"] },
  //   { label: "IT개발·데이터", subJobs: ["TEST1", "TEST2"] },
  //   { label: "디자인", subJobs: ["TEST1", "TEST2"] },
  //   { label: "영업·판매·무역", subJobs: ["TEST1", "TEST2"] },
  //   { label: "고객상담·TM", subJobs: ["TEST1", "TEST2"] },
  //   { label: "구매·자재·물류", subJobs: ["TEST1", "TEST2"] },
  //   { label: "상품기획·MD", subJobs: ["TEST1", "TEST2"] },
  //   { label: "운전·운송·배송", subJobs: ["TEST1", "TEST2"] },
  //   { label: "서비스", subJobs: ["TEST1", "TEST2"] },
  //   { label: "생산", subJobs: ["TEST1", "TEST2"] },
  //   { label: "건설·건축", subJobs: ["TEST1", "TEST2"] },
  //   { label: "의료", subJobs: ["TEST1", "TEST2"] },
  //   { label: "연구·R&D", subJobs: ["TEST1", "TEST2"] },
  //   { label: "교육", subJobs: ["TEST1", "TEST2"] },
  //   { label: "미디어·문화·스포츠", subJobs: ["TEST1", "TEST2"] },
  //   { label: "금융·보험", subJobs: ["TEST1", "TEST2"] },
  //   { label: "공공·복지", subJobs: ["TEST1", "TEST2"] },
  // ];
  
  const [jobs, setJobs] = useState([]); // API에서 받은 직군 목록 저장 - 추가
  const [subJobsMap, setSubJobsMap] = useState({}); // 각 직군에 대한 하위 직무 저장

  const [selectedJob, setSelectedJob] = useState(null); // 선택된 직무(하위 직무)를 하나만 저장
  const [selectedSubJob, setSelectedSubJob] = useState({}); // 직군별로 선택된 하위 직무 저장
  const navigate = useNavigate(); // useNavigate 훅 사용

  // useEffect를 사용해 직군 데이터를 가져옴 - 추가
  useEffect(() => {
    fetch('/open-api/occupational')
      .then(response => response.json())
      .then(data => {
        setJobs(data.body.occupationalList); // API 응답 구조에 맞게 데이터 저장
      })
      .catch(error => console.error('Error fetching jobs:', error));
  }, []);

  // 하위 직무 데이터 로드 - 추가
  const fetchSubJobs = (jobLabel, occupationalId) => {
    // 하위 직무가 아직 로드되지 않은 경우에만 API 호출
    if (!subJobsMap[jobLabel]) {
      fetch(`/open-api/occupational/${occupationalId}`)
        .then(response => response.json())
        .then(data => {
          setSubJobsMap(prev => ({ ...prev, [jobLabel]: data.body.jobList }));
        })
        .catch(error => console.error('Error fetching sub-jobs:', error));
    }
  };

  // 하위 직무 선택을 토글하는 함수
  const toggleSubJobSelection = (jobLabel, subJob) => {
    if (selectedJob === subJob) {
      // 선택된 하위 직무를 다시 클릭하면 비활성화
      setSelectedSubJob((prev) => ({ ...prev, [jobLabel]: null }));
      setSelectedJob(null);
    } else {
      // 하위 직무 선택 시 활성화, 이전 선택 해제
      setSelectedSubJob((prev) => ({ ...prev, [jobLabel]: subJob }));
      setSelectedJob(subJob);
    }
  };

  // "다음" 버튼을 눌렀을 때 실행되는 함수
  // const handleNextClick = () => {
  //   if (!selectedJob) {
  //     alert("하나 이상의 직무를 선택해 주세요.");
  //   } else {
  //     // 직무가 선택되면 /jobresume 페이지로 이동
  //     navigate('/jobresume');
  //     console.log("선택된 직무 ->", selectedJob);
  //   }
  // };

  // 직무 선택 후 POST 요청
  const handleNextClick = () => {
    if (!selectedJob) {
      alert("하나 이상의 직무를 선택해 주세요.");
    } else {
      // POST 요청
      fetch('/api/section/job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          occupational: Object.keys(selectedSubJob)[0], // 선택된 직군
          job: selectedJob // 선택된 직무
        }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.result.resultCode === 201) {
            console.log("직무 선택 성공:", data);
            // 성공하면 /jobresume 페이지로 이동
            navigate('/jobresume');
          } else {
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
            // onMouseEnter={() => setHoveredJob(job.label)}
            // onMouseLeave={() => setHoveredJob(null)}
            onMouseEnter={() => {
              fetchSubJobs(job.occupationalName, job.id); // 하위 직무 가져오기
            }}
          >
            <button
              className="jobButton"
              style={{
                backgroundColor: selectedSubJob[job.occupationalName] && selectedJob === selectedSubJob[job.occupationalName] ? "#A7C7E7" : "#f0f0f0",
              }}
            >
              {/* 선택된 하위 직무가 있으면 하위 직무 이름을 표시하고, 그렇지 않으면 직군 이름을 표시 */}
              {selectedSubJob[job.occupationalName] || job.occupationalName}
            </button>

            {/* 모든 직무에 대해 드롭다운 표시 */}
            {subJobsMap[job.occupationalName] && (
              <div className="subJobDropdown">
                {subJobsMap[job.occupationalName].map((subJob, subIndex) => (
                  <div
                    key={subIndex}
                    className="subJobItem"
                    onClick={() => toggleSubJobSelection(job.occupationalName, subJob.jobName)}
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
          disabled={!selectedJob} // 직무 선택이 없으면 버튼 비활성화
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default JobSelection;