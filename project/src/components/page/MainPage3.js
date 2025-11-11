// src/components/page/MainPage3.js
import React from 'react';
import { auth } from "../../firebase"; // Firebase auth 임포트
import './MainPage3.css'; 

export default function MainPage3({ navigate }) {
  // '여행 탐색' 버튼 클릭 핸들러 (Main.js로 이동하도록 가정)
  const handleTravelClick = () => {
    navigate('/main'); 
  };

  // '정보 공유' 버튼 클릭 핸들러 (MainPage5.js로 이동)
  const handleShareClick = () => {
    navigate('/main5'); 
  };

  // '여행 리뷰' 버튼 클릭 핸들러 (MainPage6.js로 이동)
  const handleReviewClick = () => {
    navigate('/main6'); 
  };

  // ✅ 로그아웃 버튼 클릭 핸들러 (Firebase signOut 호출 및 '/'로 이동)
  const handleLogout = async () => { 
    try {
        await auth.signOut(); // Firebase 로그아웃 호출
        alert("로그아웃 되었습니다. 초기 화면으로 돌아갑니다.");
        
        navigate("/"); // ✅ 초기 화면 (LandingPage) 경로로 이동
    } catch (error) {
        console.error("로그아웃 오류:", error);
        alert("로그아웃 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="main3-container">
      <h2 className="main3-title">여행자 메인 메뉴 🧭</h2>
      
      <div className="button-group">
        <button className="primary-btn travel-btn" onClick={handleTravelClick}>여행 탐색 🗺️</button>
        <button className="primary-btn share-btn" onClick={handleShareClick}>정보 공유 💡</button>
        <button className="primary-btn review-btn" onClick={handleReviewClick}>여행 리뷰 ✨</button>
      </div>

      <button className="logout-btn" onClick={handleLogout}>로그아웃</button>
    </div>
  );
}