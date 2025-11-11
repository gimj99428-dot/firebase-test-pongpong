// src/App.js
import React, { useState, useEffect } from "react";
// ------------------------------------
import { auth } from "./firebase"; 
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  onAuthStateChanged, // Firebase 인증 상태 리스너
} from "firebase/auth";
// ------------------------------------
import LandingPage from "./components/page/LandingPage";
import SignInPage from "./components/page/SignInPage";
import SignUpPage from "./components/page/SignUpPage";
import MainPage from "./components/page/MainPage";
import MainPage2 from "./components/page/MainPage2";
import MainPage3 from "./components/page/MainPage3";
import MainPage4 from "./components/page/MainPage4";
import MainPage5 from "./components/page/MainPage5"; 
import MainPage6 from "./components/page/MainPage6"; 
import "./App.css";

export default function App() {
  const [page, setPage] = useState("landing");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = (path) => {
    switch (path) {
      case "/": setPage("landing"); break;
      case "/signin": setPage("signin"); break;
      case "/signup": setPage("signup"); break;
      case "/main": setPage("main"); break;
      case "/main2": setPage("main2"); break;
      case "/main3": setPage("main3"); break;
      case "/main4": setPage("main4"); break;
      case "/main5": setPage("main5"); break; 
      case "/main6": setPage("main6"); break; 
      default: setPage("landing");
    }
  };

  // Firebase 인증 상태 변화 감지 및 로그인 유지/리다이렉션 로직
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // 사용자가 로그인됨
        setIsLoggedIn(true);
        // 앱을 켰거나 인증 페이지에 있을 때만 메인 메뉴로 이동
        if (page === "landing" || page === "signin" || page === "signup") {
            navigate("/main3"); 
        }
      } else {
        // 사용자가 로그아웃됨
        setIsLoggedIn(false);
        
        // 인증이 필요한 페이지에 있다면 초기 페이지로 강제 이동 (로그아웃 후 초기 화면 이동 기능)
        const authenticatedPages = ["main", "main2", "main3", "main4", "main5", "main6"];
        if (authenticatedPages.includes(page)) {
            navigate("/"); // ✅ 로그아웃 발생 시 초기 페이지 ('/')로 강제 이동
        }
      }
      setLoading(false); // 로딩 완료
    });

    // 컴포넌트 언마운트 시 리스너 해제
    return () => unsubscribe();
  }, []); 

  // onSignIn 함수 (Firebase 로그인 로직)
  const onSignIn = async (email, password) => {
    if (!email || !password) {
      alert("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("로그인 성공:", userCredential.user);
      setIsLoggedIn(true);
      navigate("/main3"); 
    } catch (error) {
      console.error("로그인 오류:", error);
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        alert("이메일 또는 비밀번호가 잘못되었습니다.");
      } else {
        alert("로그인 중 오류가 발생했습니다: " + error.message);
      }
    }
  };

  // onSignUp 함수 (Firebase 회원가입 로직)
  const onSignUp = async (email, password, confirm) => {
    if (password !== confirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!email || !password) {
      alert("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("회원가입 성공:", userCredential.user);
      alert("회원가입에 성공했습니다! 로그인 페이지로 이동합니다.");
      navigate("/signin");
    } catch (error) {
      console.error("회원가입 오류:", error);
      if (error.code === 'auth/email-already-in-use') {
        alert("이미 사용 중인 이메일입니다.");
      } else if (error.code === 'auth/weak-password') {
        alert("비밀번호는 6자리 이상이어야 합니다.");
      } else {
        alert("회원가입 중 오류가 발생했습니다: " + error.message);
      }
    }
  };
  
  // 로딩 중에는 아무것도 렌더링하지 않음
  if (loading) {
    return <div className="App-loading">앱 데이터를 불러오는 중...</div>;
  }

  return (
    <div className="App">
      {page === "landing" && <LandingPage navigate={navigate} />}
      {page === "signin" && <SignInPage onSignIn={onSignIn} navigate={navigate} />}
      {page === "signup" && <SignUpPage onSignUp={onSignUp} navigate={navigate} />}
      
      {/* 인증된 페이지는 `isLoggedIn ? <Page /> : <SignInPage />` 형태로 렌더링하여 
        인증 상태가 아닐 때 로그인 페이지로 강제 리디렉션합니다.
        (단, App.js의 useEffect에서 이미 리디렉션 처리하고 있으므로, 
         여기서는 MainPage3의 props만 명확히 전달합니다.)
      */}
      {page === "main" && (isLoggedIn ? <MainPage navigate={navigate} /> : <SignInPage onSignIn={onSignIn} navigate={navigate} />)}
      {page === "main2" && (isLoggedIn ? <MainPage2 navigate={navigate} /> : <SignInPage onSignIn={onSignIn} navigate={navigate} />)}
      {page === "main3" && (isLoggedIn ? <MainPage3 navigate={navigate} /> : <SignInPage onSignIn={onSignIn} navigate={navigate} />)} 
      {page === "main4" && (isLoggedIn ? <MainPage4 navigate={navigate} /> : <SignInPage onSignIn={onSignIn} navigate={navigate} />)}
      {page === "main5" && (isLoggedIn ? <MainPage5 navigate={navigate} /> : <SignInPage onSignIn={onSignIn} navigate={navigate} />)}
      {page === "main6" && (isLoggedIn ? <MainPage6 navigate={navigate} /> : <SignInPage onSignIn={onSignIn} navigate={navigate} />)}
    </div>
  );
}