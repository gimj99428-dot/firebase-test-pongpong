import React from "react";
import "./LandingPage.css";

export default function LandingPage({ navigate }) {
  return (
    <div className="landing-wrapper">
      <div className="landing-card">
        <h1>당신의 여행지를 공유하고<br />다른 사람들의 발자취를 따라가보세요!</h1>
        <div className="btn-group">
          <button onClick={() => navigate("/signin")} className="btn primary">로그인</button>
          <button onClick={() => navigate("/signup")} className="btn secondary">회원가입</button>
        </div>
      </div>
    </div>
  );
}