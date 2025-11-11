// src/components/page/MainPage6.js
import React, { useEffect, useState } from "react";
// ✅ Firebase Authentication (auth) 및 Firestore 함수 임포트
import { auth, db, collection, getDocs, query, orderBy, deleteDoc, doc } from "../../firebase"; 
import "./MainPage6.css";

export default function MainPage6({ navigate }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Firestore에서 게시물 불러오기
  const fetchPosts = async () => {
    // 1. 인증 확인
    const user = auth.currentUser;
    if (!user) {
        alert("로그인 후 여행 리뷰를 확인할 수 있습니다.");
        navigate("/signin");
        setLoading(false);
        return;
    }
    
    setLoading(true);
    try {
      // 'posts' 컬렉션에서 'createdAt' 기준으로 최신순 정렬하여 쿼리
      const postsCollection = collection(db, "posts");
      const q = query(postsCollection, orderBy("createdAt", "desc"));
      
      const querySnapshot = await getDocs(q);
      
      const loadedPosts = querySnapshot.docs.map(doc => ({
        id: doc.id, // Firestore 문서 ID
        ...doc.data(),
        isOwner: doc.data().userId === user.uid // 현재 사용자가 게시물 작성자인지 확인
      }));
      setPosts(loadedPosts);
    } catch (e) {
      console.error("Firestore 데이터 로드 오류: ", e);
      alert("게시물 로드 중 오류가 발생했습니다. 보안 규칙을 확인해주세요.");
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    // 컴포넌트 마운트 시 최초 1회 및 의존성 배열에 따라 실행
  }, []);

  // ✅ Firestore 게시물 삭제
  const handleDeletePost = async (id, isOwner) => {
    const user = auth.currentUser;

    if (!user) {
        alert("로그인 상태가 아닙니다. 삭제할 수 없습니다.");
        navigate("/signin");
        return;
    }
    
    // 클라이언트 측에서 소유자 확인 (Firestore 규칙에서도 재확인됨)
    if (!isOwner) {
        alert("본인이 작성한 게시물만 삭제할 수 있습니다.");
        return;
    }
    
    if (!window.confirm("정말로 이 게시물을 삭제하시겠습니까?")) return;

    try {
        // Firestore에서 해당 ID의 문서 삭제
        await deleteDoc(doc(db, "posts", id));
        // 로컬 상태 업데이트
        setPosts(posts.filter(post => post.id !== id));
        alert("게시물이 성공적으로 삭제되었습니다.");
    } catch (e) {
        console.error("게시물 삭제 오류: ", e);
        alert("게시물 삭제 중 오류가 발생했습니다. (권한 문제일 수 있습니다.)");
    }
  };

  const handleClear = () => {
    // 보안상 전체 삭제는 클라이언트에서 제공하지 않고 안내만 합니다.
    alert("현재는 개별 삭제만 지원합니다. 모든 게시물을 한 번에 삭제하려면 Firestore 콘솔을 이용해 주세요.");
  };

  return (
    <div className="feed-container">
      {/* 뒤로가기 경로 */}
      <button className="back-btn" onClick={() => navigate("/main3")}>←</button> 
      <h2>공유된 여행지</h2>
      <p className="desc">다른 사람들의 여행 이야기를 만나보세요 🌍</p>

      {loading && <p className="loading">게시물을 불러오는 중...</p>}

      {!loading && posts.length === 0 ? (
        <p className="empty">아직 공유된 여행이 없습니다.</p>
      ) : (
        <div className="post-list">
          {posts.map((post) => (
            <div className="post-card" key={post.id}>
              <img src={post.image} alt="여행" className="post-image" />
              <div className="post-info">
                <p className="post-date">📅 {post.date}</p>
                <p className="post-text">{post.text}</p>
                
                {/* 작성자에게만 삭제 버튼 표시 */}
                {post.isOwner && (
                    <button 
                        className="delete-post-btn" 
                        onClick={() => handleDeletePost(post.id, true)}
                    >
                        삭제
                    </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {posts.length > 0 && (
        <button className="clear-btn" onClick={handleClear}>
          전체 삭제 안내
        </button>
      )}
    </div>
  );
}