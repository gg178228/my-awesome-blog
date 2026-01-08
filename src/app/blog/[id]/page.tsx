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
    <div style={{ backgroundColor: '#000', minHeight: '100vh', color: '#fff', fontFamily: '"Inter", sans-serif' }}>
      
      <style>{`
        /* 🚩 반응형 레이아웃 설정 */
        .container {
          display: flex;
          max-width: 1200px;
          margin: 0 auto;
          flex-direction: row;
        }

        /* 화면이 1024px보다 작아지면 사이드바를 숨기거나 아래로 보냄 */
        @media (max-width: 1024px) {
          .container { flex-direction: column; }
          .sidebar { 
            width: 100% !important; 
            border-right: none !important; 
            border-top: 1px solid #111; 
            order: 2; /* 본문 뒤로 보냄 */
            height: auto !important;
            position: static !important;
          }
          .main-content { padding: 40px 20px !important; }
        }

        .violet-tag {
          background: #7F00FF;
          display: inline-block;
          padding: 3px 12px;
          transform: skewX(-15deg);
          margin-bottom: 15px;
        }

        .log-item {
          display: flex;
          gap: 12px;
          padding: 10px;
          border-left: 2px solid transparent;
          transition: 0.2s;
        }
        .log-item:hover { background: #080808; border-left: 2px solid #7F00FF; }
        .log-item.active { background: #111; border-left: 2px solid #7F00FF; }

        .article-body { font-size: 1.1rem; line-height: 1.8; color: #bbb; }
        .article-body h2 { color: #fff; margin: 50px 0 20px 0; font-size: 1.8rem; font-weight: 800; border-bottom: 1px solid #111; padding-bottom: 10px; }
        .article-body p { margin-bottom: 25px; }
      `}</style>

      <div className="container">
        
        {/* [사이드바] 반응형으로 크기 조절됨 */}
        <aside className="sidebar" style={{ 
          width: '280px', 
          flexShrink: 0,
          padding: '80px 20px', 
          borderRight: '1px solid #111',
          height: '100vh',
          position: 'sticky',
          top: 0,
          overflowY: 'auto'
        }}>
          <div style={{ marginBottom: '30px' }}>
            <Link href="/blog" style={{ color: '#444', fontSize: '10px', fontWeight: 900, textDecoration: 'none', letterSpacing: '1px' }}>
              {`< BACK_TO_DATABASE`}
            </Link>
          </div>

          <p style={{ fontSize: '10px', color: '#222', fontWeight: 900, marginBottom: '20px' }}>RELATED_LOGS</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {allPosts.map((p) => (
              <Link key={p.id} href={`/blog/${p.id}`} style={{ textDecoration: 'none' }}>
                <div className={`log-item ${p.id === id ? 'active' : ''}`}>
                  {/* 🚩 썸네일 복구 */}
                  <img 
                    src={(p as any).thumbnail || '/no-image.png'} 
                    style={{ width: '40px', height: '40px', objectFit: 'cover', opacity: p.id === id ? 1 : 0.4 }} 
                  />
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ 
                      fontSize: '12px', 
                      fontWeight: 700, 
                      color: p.id === id ? '#fff' : '#555',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {p.title}
                    </div>
                    <div style={{ fontSize: '9px', color: '#222', marginTop: '2px' }}>{p.date}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </aside>

        {/* [본문] 중앙 집중형 */}
        <main className="main-content" style={{ flex: 1, padding: '80px 80px 100px 80px', maxWidth: '900px' }}>
          <header style={{ marginBottom: '60px' }}>
            <div className="violet-tag">
              <span style={{ color: '#fff', fontWeight: 900, fontSize: '10px', transform: 'skewX(15deg)', display: 'block' }}>
                {(post as any).category || 'LOG'}
              </span>
            </div>
            
            <h1 style={{ 
              fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
              fontWeight: 900, 
              lineHeight: 1.1, 
              letterSpacing: '-2px',
              margin: '10px 0'
            }}>
              {post.title}
            </h1>
            
            <div style={{ fontSize: '11px', color: '#333', marginTop: '20px', fontWeight: 700 }}>
              FILE_DATA: {post.date} // {post.id}
            </div>
          </header>

          <article className="article-body">
            <MDXRemote source={post.content} />
          </article>

          <footer style={{ marginTop: '150px', borderTop: '1px solid #111', paddingTop: '20px' }}>
             <span style={{ fontSize: '10px', color: '#222', fontWeight: 900 }}>© SYSTEM_V4 // TERMINAL_CLOSED</span>
          </footer>
        </main>

      </div>
    </div>
  );
}