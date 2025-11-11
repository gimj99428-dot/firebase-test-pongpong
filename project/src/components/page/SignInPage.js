// src/components/page/SignInPage.js (Firestore 연동)
import React, { useState } from "react";
import { auth, signInWithEmailAndPassword } from "../../firebase"; // 👈 Firebase import
import "./SignInPage.css";

export default function SignInPage({ navigate }) { // 👈 onSignIn prop 제거
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    if (!email || !password) {
        alert("이메일과 비밀번호를 입력해주세요.");
        return;
    }

    try {
      // Firebase Authentication을 사용하여 로그인
      await signInWithEmailAndPassword(auth, email, password);
      alert("로그인 성공! 메인 메뉴로 이동합니다.");
      navigate("/main3");
    } catch (error) {
      console.error("로그인 오류: ", error);
      alert(`로그인 오류: 이메일 또는 비밀번호를 확인해주세요. (${error.message})`);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>로그인</h2>
        <input type="email" placeholder="이메일" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="비밀번호" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleSignIn}>로그인</button> {/* 👈 함수 직접 호출 */}
        <p>계정이 없으신가요? <span onClick={() => navigate("/signup")}>회원가입</span></p>
      </div>
    </div>
  );
}