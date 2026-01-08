"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setBlink(prev => !prev), 800);
    return () => clearInterval(timer);
  }, []);

  const sideMenus = [
    { name: "01 LIFE_LOG", path: "/blog?category=일상" },
    { name: "02 DEV_CORE", path: "/blog?category=개발" },
    { name: "03 STUDY_DRIVE", path: "/blog?category=공부" },
    { name: "04 PROJECT", path: "/blog?category=프로젝트" },
    { name: "05 GAME_CENTER", path: "/blog?category=게임" },
    { name: "06 TOTAL_ARCHIVE", path: "/blog" }
  ];

  return (
    <main style={{
      backgroundColor: '#000',
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
      color: '#fff',
      fontFamily: '"Inter", "Pretendard", sans-serif',
    }}>
      
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        backgroundImage: `url('/bg.jpg')`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.25,
        zIndex: 1,
      }} />

      {/* 🚩 수정된 상단 인디케이터 섹션 */}
      <div style={{
        position: 'absolute', 
        top: '40px', 
        left: 0, 
        width: '100%',
        padding: '0 40px', // 여백을 조금 줄여서 짤림 방지
        display: 'flex', 
        justifyContent: 'space-between',
        boxSizing: 'border-box', // 패딩이 너비에 포함되도록 설정
        zIndex: 10, 
        fontSize: '10px', 
        fontWeight: 800, 
        letterSpacing: '2px', 
        color: '#666'
      }}>
        <div style={{ flexShrink: 0 }}>SYSTEM_VERSION: 4.0.2</div>
        {/* 🚩 짤림 방지를 위해 너비를 고정하지 않고 우측 정렬 유지 */}
        <div style={{ 
          color: blink ? '#7F00FF' : '#444', 
          transition: '0.3s',
          textAlign: 'right',
          whiteSpace: 'nowrap' // 줄바꿈 방지
        }}>
          CONNECTED_
        </div>
      </div>

      <div style={{
        position: 'absolute', top: '45%', left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center', zIndex: 10
      }}>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', 
          fontWeight: 900,
          margin: 0,
          letterSpacing: '-2px',
          color: '#fff',
          textShadow: '3px 3px 0px #7F00FF',
        }}>
          FRAGMENT
        </h1>
        <div style={{
          marginTop: '15px',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '6px',
          color: '#888',
          textTransform: 'uppercase'
        }}>
          Records of a Midnight Thinker
        </div>
      </div>

      <nav style={{
        position: 'absolute', bottom: '120px', width: '100%',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: '15px', zIndex: 20
      }}>
        {sideMenus.map((menu) => (
          <Link 
            key={menu.name} 
            href={menu.path}
            onMouseEnter={() => setHovered(menu.name)}
            onMouseLeave={() => setHovered(null)}
            style={{
              fontSize: '13px', 
              fontWeight: 700, 
              color: hovered === menu.name ? '#fff' : '#888',
              textDecoration: 'none', 
              padding: '4px 20px', 
              position: 'relative',
              transition: '0.2s ease',
              letterSpacing: '1px'
            }}
          >
            {hovered === menu.name && (
              <div style={{
                position: 'absolute', bottom: '0', left: '0', width: '100%', height: '1px',
                backgroundColor: '#7F00FF',
                boxShadow: '0px 0px 8px #7F00FF'
              }} />
            )}
            {menu.name}
          </Link>
        ))}
      </nav>

      <div style={{
        position: 'absolute', bottom: '40px', width: '100%',
        padding: '0 60px', display: 'flex', justifyContent: 'center',
        zIndex: 10, fontSize: '9px', 
        color: '#444',
        fontWeight: 900, letterSpacing: '2px'
      }}>
        © 2026 FRAGMENT_ARCHIVE // ALL RIGHTS RESERVED.
      </div>

      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        background: 'radial-gradient(circle, transparent 20%, #000 150%)',
        zIndex: 5, pointerEvents: 'none'
      }} />

    </main>
  );
}