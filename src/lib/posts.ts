import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content');

export function getAllPosts() {
  if (!fs.existsSync(postsDirectory)) return [];
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames
    .filter(f => f.endsWith('.md'))
    .map(fileName => {
      const id = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const fileStats = fs.statSync(fullPath); // 🚩 파일 생성 날짜를 읽기 위해 필요
      
      const { data } = matter(fileContents);

      return {
        id,
        title: data.title || id, // 제목 없으면 파일명이라도 출력
        // 🚩 날짜 자동화: 마크다운에 date가 없으면 파일 생성일 사용
        date: data.date || fileStats.birthtime.toISOString().split('T')[0],
        // 🚩 에러 방지: 썸네일 데이터 추가
        thumbnail: data.thumbnail || null, 
        ...data,
      };
    })
    // 최신글이 위로 오게 정렬
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const fileStats = fs.statSync(fullPath);
  const { data, content } = matter(fileContents);

  return {
    id,
    content,
    title: data.title || id,
    date: data.date || fileStats.birthtime.toISOString().split('T')[0],
    thumbnail: data.thumbnail || null,
    ...data,
  };
}