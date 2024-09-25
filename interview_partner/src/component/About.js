import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './CustomCard';  // 경로는 실제 파일 위치에 맞게 조정하세요
import './About.css';

const About = () => {
    return (
        <div className="about-container">
            <h1>GPT AI 면접 코치란?</h1>
            <Card className="about-card">
                <CardHeader>
                    <CardTitle>취업 준비생을 위한 혁신적인 도구</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>GPT AI 면접 코치는 취업 준비생들의 면접 역량을 강화하기 위해 설계된 혁신적인 애플리케이션입니다.</p>
                </CardContent>
            </Card>

            <h2>주요 기능</h2>
            <div className="features-grid">
                {['맞춤형 면접 준비', 'AI 생성 예상 질문', '실시간 답변 연습', '즉각적인 피드백', '성장 추적'].map((feature, index) => (
                    <Card key={index} className="feature-card">
                        <CardContent>
                            <p>{feature}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <h2>사용 방법</h2>
            <ol className="usage-steps">
                <li>로그인 및 홈 화면에서 시작</li>
                <li>직무 선택</li>
                <li>이력 및 강점 입력</li>
                <li>예상 질문 확인</li>
                <li>면접 답변 연습</li>
                <li>피드백 확인</li>
                <li>면접 기록 및 성장 확인</li>
            </ol>

            <Card className="tips-card">
                <CardHeader>
                    <CardTitle>팁</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul>
                        <li>정기적으로 연습하여 꾸준한 성장을 도모하세요.</li>
                        <li>다양한 질문에 답변해보며 폭넓은 준비를 하세요.</li>
                        <li>피드백을 꼼꼼히 검토하고 개선점에 집중하세요.</li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
};

export default About;