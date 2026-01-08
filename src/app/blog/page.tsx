import { getAllPosts } from '../../../lib/posts';
import BlogListClient from './BlogListClient';
import { Suspense } from 'react';

export default function BlogPage() {
  const allPosts = getAllPosts(); // 서버에서 파일 읽기

  return (
    <Suspense fallback={<div style={{color: 'white'}}>LOADING_SYSTEM...</div>}>
      <BlogListClient allPosts={allPosts} />
    </Suspense>
  );
}