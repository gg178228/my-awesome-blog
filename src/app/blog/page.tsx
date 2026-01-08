"use client";
import { getAllPosts } from '@/lib/posts'; // 또는 '../../lib/posts'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';


export default function Home() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [blink, setBlink] = useState(true);

  // 갤러그 느낌의 깜빡이는 효과 (1초마다)
  useEffect(() => {
    const timer = setInterval(() => setBlink(prev => !prev), 500);
    return () => clearInterval(timer);
  }, []);

const sideMenus = [
  { name: "01 START_ENCOUNTER", path: "/blog/test" },
  { name: "02 DATA_LOG_00", path: "/blog" },
  { name: "03 LABORATORY_Z", path: "/laboratory" },
  { name: "04 EQUIPMENT_STK", path: "/skills" },   
  { name: "05 SIGNAL_REVERB", path: "/contact" }  
];

  return (
    <main style={{
      backgroundColor: '#000',
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
      color: '#fff',
      // 픽셀 느낌이 나는 시스템 폰트 조합
      fontFamily: '"Press Start 2P", "Courier New", "Dotum", monospace',
    }}>
      
      {/* 1. 배경 이미지 (어둡게 처리) */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url('/bg.jpg')`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.25,
        zIndex: 1,
        filter: 'grayscale(0.5)'
      }} />

      {/* 2. 상단 갤러그 스코어보드 */}
      <div style={{
        position: 'absolute',
        top: '30px',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        zIndex: 10,
        fontSize: '12px',
        letterSpacing: '2px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#ff0000', marginBottom: '5px' }}>1UP</div>
          <div style={{ visibility: blink ? 'visible' : 'hidden' }}>40400</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#ff0000', marginBottom: '5px' }}>HIGH SCORE</div>
          <div>99999</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#00ffff', marginBottom: '5px' }}>STAGE</div>
          <div style={{ color: '#fff' }}>04</div>
        </div>
      </div>

      {/* 3. 중앙 404 로고 */}
      <div style={{
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        zIndex: 10
      }}>
        <div style={{
          fontSize: '70px',
          fontWeight: '900',
          color: '#00ff00',
          textShadow: '5px 5px 0px #ff0000',
          margin: '0',
          letterSpacing: '5px'
        }}>
          404
        </div>
        <div style={{ 
          marginTop: '10px', 
          color: '#fff', 
          fontSize: '10px', 
          letterSpacing: '4px',
          opacity: 0.8
        }}>
          -- NOT FOUND --
        </div>
      </div>

      {/* 4. 하단 메뉴 */}
      <nav style={{
        position: 'absolute',
        bottom: '100px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '15px',
        zIndex: 20
      }}>
        {sideMenus.map((menu) => (
          <Link 
            key={menu.name} 
            href={menu.path}
            onMouseEnter={() => setHovered(menu.name)}
            onMouseLeave={() => setHovered(null)}
            style={{
              fontSize: '14px',
              color: hovered === menu.name ? '#ffff00' : '#fff',
              textDecoration: 'none',
              padding: '5px 20px',
              border: hovered === menu.name ? '2px solid #ffff00' : '2px solid transparent',
              transition: '0.1s',
              backgroundColor: hovered === menu.name ? 'rgba(255, 255, 0, 0.1)' : 'transparent'
            }}
          >
            {hovered === menu.name ? '> ' : '  '}{menu.name}
          </Link>
        ))}
      </nav>

      {/* 5. 아군 기체 & 크레딧 */}
      <div style={{
        position: 'absolute',
        bottom: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        zIndex: 10
      }}>
        {/* 기체 모양 (간단한 도형) */}
        <div style={{ 
          width: '0', 
          height: '0', 
          borderLeft: '15px solid transparent', 
          borderRight: '15px solid transparent', 
          borderBottom: '25px solid #00ffff',
          margin: '0 auto 10px auto' 
        }} />
        <div style={{ color: '#ff00ff', fontSize: '10px', letterSpacing: '2px' }}>
          CREDIT 01
        </div>
      </div>

      {/* 6. 브라운관(CRT) 스캔라인 효과 */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.2) 50%)',
        backgroundSize: '100% 4px',
        zIndex: 15,
        pointerEvents: 'none'
      }} />

      {/* 7. 화면 지직거림 노이즈 오버레이 */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'url("https://www.transparenttextures.com/patterns/stardust.png")',
        opacity: 0.1,
        zIndex: 16,
        pointerEvents: 'none'
      }} />

    </main>
  );
}