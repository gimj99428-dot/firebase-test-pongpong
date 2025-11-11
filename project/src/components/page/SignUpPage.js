// src/components/page/SignUpPage.js (Firestore 연동)
import React, { useState } from "react";
import { auth, createUserWithEmailAndPassword } from "../../firebase"; // 👈 Firebase import
import "./SignUpPage.css";

export default function SignUpPage({ navigate }) { // 👈 onSignUp prop 제거
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSignUp = async () => {
    if (pw !== confirm) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }
    if (!email || !pw) {
      alert("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    try {
      // Firebase Authentication을 사용하여 사용자 생성
      await createUserWithEmailAndPassword(auth, email, pw);
      alert("회원가입 성공! 로그인 페이지로 이동합니다.");
      navigate("/signin");
    } catch (error) {
      console.error("회원가입 오류: ", error);
      alert(`회원가입 오류: ${error.message}`);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>회원가입</h2>
        <input type="email" placeholder="이메일" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="비밀번호" onChange={(e) => setPw(e.target.value)} />
        <input type="password" placeholder="비밀번호 확인" onChange={(e) => setConfirm(e.target.value)} />
        <button onClick={handleSignUp}>가입하기</button> {/* 👈 함수 직접 호출 */}
        <p>이미 계정이 있으신가요? <span onClick={() => navigate("/signin")}>로그인</span></p>
      </div>
    </div>
  );
}