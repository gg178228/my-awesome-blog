"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function BlogListClient({ allPosts }: { allPosts: any[] }) {
  const searchParams = useSearchParams();
  // 초기 상태를 전체로 설정
  const [selectedCategory, setSelectedCategory] = useState('전체');

  // URL 파라미터가 있을 경우 해당 카테고리로 변경
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  const categories = ['전체', '개발', '일상', '공부', '프로젝트', '게임'];

  // 🔥 필터링 로직 (allPosts가 비어있을 경우를 대비해 기본값 처리)
  const filteredPosts = (allPosts || []).filter(post => {
    if (selectedCategory === '전체') return true;
    return (post.category || '미분류') === selectedCategory;
  });

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', color: '#fff', padding: '40px 20px', fontFamily: '"Inter", sans-serif' }}>
      
      <style>{`
        .category-item {
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          background: none;
          border: none;
          color: #444;
          padding: 8px 16px;
          transition: all 0.2s ease;
          position: relative;
          z-index: 1;
        }

        .category-item:hover {
          color: #fff;
        }

        /* 활성화 시: 바이올렛 스크래치 반전 */
        .category-item.active {
          color: #fff !important;
        }

        .category-item.active::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          background: #7F00FF;
          z-index: -1;
          transform: translate(-50%, -50%) skewX(-12deg);
          clip-path: polygon(0% 10%, 100% 0%, 95% 90%, 5% 100%);
          box-shadow: 4px 4px 0px #4B0082;
        }

        .post-card {
          border: 1px solid #1a1a1a;
          background: #050505;
          transition: 0.3s;
          border-radius: 2px;
          height: 100%;
        }
        .post-card:hover {
          border-color: #7F00FF;
          transform: translateY(-4px);
        }
      `}</style>

      {/* 헤더: 줄(Line) 삭제됨 */}
      <header style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-2px', margin: 0 }}>
          ARCHIVE. <span style={{ color: '#7F00FF' }}>{filteredPosts.length}</span>
        </h1>
        {/* 기존에 있던 선(div) 제거함 */}
      </header>

      {/* 🚩 가로 중앙 정렬 카테고리 (작동 확인 완료) */}
      <nav style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '8px', 
        marginBottom: '60px',
        flexWrap: 'wrap'
      }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`category-item ${selectedCategory === cat ? 'active' : ''}`}
          >
            {cat}
          </button>
        ))}
      </nav>

      {/* 포스트 리스트 */}
      <div style={{ 
        maxWidth: '1000px', 
        margin: '0 auto', 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '25px' 
      }}>
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <Link key={post.id} href={`/blog/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="post-card">
                <div style={{ width: '100%', height: '160px', overflow: 'hidden', backgroundColor: '#111' }}>
                  <img 
                    src={post.thumbnail || '/no-image.png'} 
                    alt={post.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7, filter: 'grayscale(0.5)' }}
                  />
                </div>
                <div style={{ padding: '15px' }}>
                  <span style={{ fontSize: '10px', color: '#7F00FF', fontWeight: 800 }}>
                    {(post.category || 'ETC').toUpperCase()}
                  </span>
                  <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '5px 0', lineHeight: '1.4' }}>
                    {post.title}
                  </h2>
                  <p style={{ fontSize: '11px', color: '#444', margin: '10px 0 0 0' }}>{post.date}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#444', padding: '100px' }}>
            해당 카테고리에 게시글이 없습니다.
          </div>
        )}
      </div>

      <footer style={{ marginTop: '100px', textAlign: 'center', opacity: 0.2, fontSize: '9px', letterSpacing: '1px' }}>
        © SYSTEM_V4 // VIOLET_SECTOR
      </footer>
    </div>
  );
}