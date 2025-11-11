// src/components/page/MainPage5.js
import React, { useState } from "react";
// ✅ Firebase Firestore 함수 및 Authentication 가져오기
import { auth, db, collection, addDoc } from "../../firebase"; 
import "./MainPage5.css"; 

export default function MainPage5({ navigate }) {
  const [date, setDate] = useState("");
  const [image, setImage] = useState(null); // URL 문자열
  const [text, setText] = useState("");
  const [urlInput, setUrlInput] = useState(""); 

  // URL 입력 시 이미지 상태 업데이트
  const handleUrlInput = () => {
    if (urlInput) {
      setImage(urlInput); 
      setUrlInput(''); 
      alert("이미지 URL이 적용되었습니다.");
    } else {
      alert("이미지 URL을 입력해주세요.");
    }
  };

  // ✅ Firestore에 여행 정보 업로드 함수
  const handleUpload = async () => {
    if (!date || !image || !text) {
      alert("날짜, 이미지 URL, 내용을 모두 입력해주세요!");
      return;
    }

    // ✅ 1. 현재 로그인된 사용자 UID 가져오기 (보안 규칙 준수)
    const user = auth.currentUser;
    if (!user) {
        alert("로그인 후 이용해 주세요.");
        navigate("/signin");
        return;
    }

    const newPost = { 
        date, 
        image, 
        text,
        createdAt: new Date(), // 게시물 정렬을 위한 타임스탬프
        userId: user.uid,      // 👈 보안 규칙에서 사용할 현재 사용자 ID
    };

    try {
        // ✅ 2. Firestore의 'posts' 컬렉션에 새 문서 추가
        await addDoc(collection(db, "posts"), newPost);
        
        alert("여행 정보가 Firestore에 성공적으로 공유되었습니다!");
        
        // 업로드 성공 후, 리뷰/피드 페이지로 이동
        navigate("/main6"); 

    } catch (e) {
        console.error("Firestore 문서 추가 오류: ", e);
        alert("여행 정보 공유 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="share-page-container">
      <button className="back-btn" onClick={() => navigate("/main3")}>←</button>

      <h2 className="page-title">여행 정보 공유하기 📝</h2>

      {/* 날짜 입력 섹션 */}
      <div className="share-input-group date-input">
        <label className="input-label">📅 여행 날짜</label>
        <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            className="input-field"
        />
      </div>

      {/* 이미지 입력 섹션 */}
      <div className="share-input-group image-input">
        <label className="input-label">🖼️ 이미지 URL</label>
        
        <p className="description">이미지 URL을 입력하고 '적용' 버튼을 눌러주세요.</p>
        <div className="url-input-group">
            <input 
                type="text" 
                placeholder="이미지 URL을 여기에 붙여넣으세요"
                value={urlInput} 
                onChange={(e) => setUrlInput(e.target.value)} 
                className="input-field url-input"
            />
            <button className="url-btn primary-btn" onClick={handleUrlInput}>적용</button>
        </div>
        
        {/* 미리보기 컨테이너 */}
        {image && (
            <div className="image-preview-container">
                <img src={image} alt="미리보기" className="preview-image" />
            </div>
        )}
      </div>

      {/* 내용 입력 섹션 */}
      <div className="share-input-group text-input">
        <label className="input-label">✏️ 내용 작성</label>
        <textarea
          placeholder="여행 경험을 자세히 작성해주세요..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="textarea-field"
        />
      </div>

      {/* 업로드 버튼 */}
      <button onClick={handleUpload} className="upload-button primary-btn">
        공유하기 🚀
      </button>
    </div>
  );
}