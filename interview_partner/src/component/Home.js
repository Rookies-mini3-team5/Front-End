import React, { useState } from 'react';
import { Bell, ShoppingBag, MessageSquare, Grid, List, Users, Calendar, Search, Clock, LogOut, User } from 'lucide-react';
import './Home.css';

const Home = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    const getDaysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const renderCalendar = () => {
        const daysInMonth = getDaysInMonth(currentMonth, currentYear);
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const days = [];

        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            days.push(
                <div key={`day-${i}`} className={`calendar-day ${i === 10 || i === 5 || i === 15 ? 'has-event' : ''}`}>
                    {i}
                    {i === 10 && <div className="event-indicator">인터뷰 면접</div>}
                    {i === 5 && <div className="event-indicator">인터뷰 1</div>}
                    {i === 15 && <div className="event-indicator">구업 준비</div>}
                </div>
            );
        }

        return days;
    };

    return (
        <div className="jobdash-container">
            {/* Left Sidebar */}
            <aside className="left-sidebar">
                {/* Profile Section */}
                <div className="profile-section">
                    <img src="/api/placeholder/100/100" alt="Profile" className="profile-pic" />
                    <h3>홍길동</h3>
                    <p>구직자</p>
                </div>

                {/* Menu Section */}
                <div className="menu-section">
                    <div className="menu-item active">
                        <Grid size={20} />
                        <span>대시보드</span>
                    </div>
                    <div className="menu-item">
                        <List size={20} />
                        <span>작업 목록</span>
                    </div>
                    <div className="menu-item">
                        <Users size={20} />
                        <span>지원자</span>
                    </div>
                    <div className="menu-item">
                        <Calendar size={20} />
                        <span>캘린더</span>
                    </div>
                    <div className="menu-item">
                        <MessageSquare size={20} />
                        <span>메시지</span>
                    </div>
                </div>

                {/* Logout Section */}
                <div className="logout-section">
                    <LogOut size={20} />
                    <span>로그아웃</span>
                </div>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                <header className="header">
                    <h1 className="logo">JobDash 개요</h1>
                    <div className="search-bar">
                        <Search size={20} />
                        <input type="text" placeholder="Search for Jobs" />
                    </div>
                    <div className="header-icons">
                        <Bell size={24} />
                        <ShoppingBag size={24} />
                        <MessageSquare size={24} />
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="dashboard">
                    <div className="job-cards">
                        {/* Job Card 1 */}
                        <div className="job-card">
                            <img src="/api/placeholder/400/300" alt="Remote Developer" />
                            <h3>원격 개발자</h3>
                            <p>재택근무 직위</p>
                            <p><Clock size={16} /> 시작일: 2021년 10월 15일</p>
                            <p><Users size={16} /> 지원자: 12명</p>
                            <div className="job-card-footer">
                                <button>인터뷰 일정</button>
                                <button>피드백을 기다리는 중</button>
                            </div>
                        </div>

                        {/* Job Card 2 */}
                        <div className="job-card">
                            <img src="/api/placeholder/400/300" alt="Job Selection" />
                            <h3>직업 선택</h3>
                            <p>당신에게 맞는 직업을 찾아보세요</p>
                            <button className="primary-btn">알아보기</button>
                        </div>

                        {/* Job Card 3 */}
                        <div className="job-card">
                            <img src="/api/placeholder/400/300" alt="설문 참여" />
                            <h3>선도 산업</h3>
                            <p>최고 직사</p>
                            <div className="job-card-footer">
                                <button>다가올 인터뷰</button>
                                <button>인터뷰 준비</button>
                            </div>
                        </div>

                        {/* Job Card 4 */}
                        <div className="job-card">
                            <img src="/api/placeholder/400/300" alt="이력서 검토" />
                            <h3>이력서 검토</h3>
                            <p>GPT로 이력서 검토</p>
                            <div className="job-card-footer">
                                <button>이력서 검토 예정</button>
                                <button>이력서 검토 상태</button>
                            </div>
                        </div>
                    </div>

                    {/* Calendar Section */}
                    <div className="calendar-section">
                        <h3>인터뷰 일정</h3>
                        <div className="calendar-header">
                            <button onClick={() => setCurrentMonth(prev => prev - 1)}>&lt;</button>
                            <span>{`${currentYear}년 ${currentMonth + 1}월`}</span>
                            <button onClick={() => setCurrentMonth(prev => prev + 1)}>&gt;</button>
                        </div>
                        <div className="calendar-grid">
                            <div className="calendar-day-header">일</div>
                            <div className="calendar-day-header">월</div>
                            <div className="calendar-day-header">화</div>
                            <div className="calendar-day-header">수</div>
                            <div className="calendar-day-header">목</div>
                            <div className="calendar-day-header">금</div>
                            <div className="calendar-day-header">토</div>
                            {renderCalendar()}
                        </div>
                    </div>
                </div>
            </main>

            {/* Right Sidebar */}
            <aside className="right-sidebar">
                <h2>진행중인 신청</h2>
                <div className="application-card">
                    <img src="/api/placeholder/100/100" alt="Software Engineer" />
                    <div>
                        <h4>소프트웨어 엔지니어</h4>
                        <p>(면접일: 3일)</p>
                        <p><Clock size={16} /> 작성일: 2021년 10월 10일</p>
                        <div className="progress-bar">
                            <div className="progress" style={{width: '40%'}}></div>
                        </div>
                        <p>2/5 단계를 완료</p>
                    </div>
                </div>

                <h3>인터뷰 기록</h3>
                <div className="interview-records">
                    <div className="record-item">
                        <div className="record-icon">
                            <Clock size={20} />
                        </div>
                        <div className="record-info">
                            <h4>소프트웨어 엔지니어</h4>
                            <p>면접일자: 09/10/2021</p>
                        </div>
                        <div className="record-progress">83%</div>
                    </div>
                    <div className="record-item">
                        <div className="record-icon">
                            <Clock size={20} />
                        </div>
                        <div className="record-info">
                            <h4>제품 관리자</h4>
                            <p>면접일자: 08/10/2021</p>
                        </div>
                        <div className="record-progress">72%</div>
                    </div>
                    <div className="record-item">
                        <div className="record-icon">
                            <Clock size={20} />
                        </div>
                        <div className="record-info">
                            <h4>마케팅 매니저</h4>
                            <p>면접일자: 07/10/2021</p>
                        </div>
                        <div className="record-progress">34%</div>
                    </div>
                </div>

                <div className="alert-box">
                    <h3>알림</h3>
                    <p>새로운 일자리 추천!</p>
                    <p>최근 구인 공고를 확인하고 지금 지원하세요.</p>
                    <button className="alert-btn">→</button>
                </div>
            </aside>
        </div>
    );
};

export default Home;
