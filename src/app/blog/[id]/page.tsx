import { getPostData, getAllPosts } from '@/lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = getPostData(id);
  const allPosts = getAllPosts();

  if (!post) return notFound();

  return (
    <div style={{ backgroundColor: 'black', minHeight: '100vh', color: 'white' }}>
      
      {/* 컨테이너: 화면이 좁아지면 flex-direction을 column으로 바꾸는 효과 */}
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', // 화면 좁으면 아래로 떨어지게 함
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '20px'
      }}>
        
        {/* [사이드바] 모바일에서는 위, PC에서는 왼쪽 */}
        <aside style={{ 
          flex: '1 1 250px', // 최소 250px 확보, 공간 없으면 줄바꿈
          maxWidth: '300px',
          borderRight: '1px solid #222', 
          paddingRight: '20px',
          marginBottom: '40px',
          maxHeight: '80vh', // 너무 길면 사이드바만 스크롤
          overflowY: 'auto' 
        }}>
          <h3 style={{ color: '#00ffff', fontSize: '14px', marginBottom: '20px', position: 'sticky', top: 0, backgroundColor: 'black' }}>
            OTHER_LOGS
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {allPosts.map((p) => (
              <Link key={p.id} href={`/blog/${p.id}`} style={{ textDecoration: 'none' }}>
                <div style={{ 
                  display: 'flex', gap: '10px', padding: '8px', 
                  border: p.id === id ? '1px solid #ff00ff' : '1px solid #111',
                  backgroundColor: p.id === id ? '#111' : 'transparent'
                }}>
                  <img src={p.thumbnail || '/no-image.png'} style={{ width: '50px', height: '50px', objectFit: 'cover', flexShrink: 0 }} />
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ color: p.id === id ? '#ffff00' : '#ccc', fontSize: '12px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {p.title}
                    </div>
                    <div style={{ color: '#555', fontSize: '10px' }}>{p.date}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </aside>

      {/* [본문] 남는 공간을 다 채움 */}
        <main style={{ flexGrow: 1, maxWidth: '800px', padding: '0 20px 100px 20px' }}>
          
          {/* 🚩 상단 블로그 타이틀 헤더 추가 */}
          <nav style={{ marginBottom: '60px' }}>
            <Link href="/blog" style={{ 
              textDecoration: 'none', 
              color: '#555', // 평소엔 차분한 회색
              fontSize: '12px', 
              fontFamily: 'monospace',
              letterSpacing: '3px',
              transition: '0.3s'
            }}>
              {`// RETURN_TO_HOME [ LOG_DATABASE ]`}
            </Link>
          </nav>

          {/* 기존 제목 섹션 */}
          <header style={{ marginBottom: '40px' }}>
            <h1 style={{ 
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', 
              color: '#ffff00', 
              lineHeight: '1.2',
              margin: 0 
            }}>
              {post.title}
            </h1>
            <div style={{ color: '#444', fontSize: '12px', marginTop: '10px' }}>
              POSTED_AT: {post.date}
            </div>
          </header>
          
          <article style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#e0e0e0', wordBreak: 'keep-all' }}>
            <MDXRemote source={post.content} />
          </article>

          {/* 하단 시스템 메시지만 가볍게 남김 */}
          <footer style={{ marginTop: '80px', borderTop: '1px solid #111', paddingTop: '20px' }}>
            <p style={{ color: '#222', fontSize: '10px', letterSpacing: '1px' }}>
              END_OF_LOG // ID: {post.id}
            </p>
          </footer>
  

        </main>

      </div>
    </div>
  );
}