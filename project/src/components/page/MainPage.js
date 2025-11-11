// src/components/page/MainPage.js
import React from "react";
import "./MainPage.css";

export default function MainPage({ navigate }) {
  return (
    <div className="main-container">
      <button className="back-btn" onClick={() => navigate("/main3")}>←</button>
      <h1>가까운 여행지와 먼 여행지를 탐색하세요</h1>
      <div className="buttons">
        <button onClick={() => navigate("/main2")} className="btn">가까운 여행지</button>
        <button onClick={() => navigate("/main4")} className="btn">먼 여행지</button>
      </div>
      <button onClick={() => navigate("/")} className="logout-btn">로그아웃</button>
    </div>
  );
}