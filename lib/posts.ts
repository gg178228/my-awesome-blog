import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content');

export function getAllPosts() {
  if (!fs.existsSync(postsDirectory)) {
    console.error("🔴 에러: content 폴더가 없습니다!", postsDirectory);
    return [];
  }
  
  const fileNames = fs.readdirSync(postsDirectory);
  
  return fileNames
    .filter(f => f.endsWith('.md'))
    .map(fileName => {
      const id = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const fileStats = fs.statSync(fullPath); // 날짜 자동화용
      
      const { data } = matter(fileContents);

      return {
        ...data, // 1. 마크다운 상단 데이터를 전부 가져옴
        id,
        title: data.title || id,
        date: data.date || fileStats.birthtime.toISOString().split('T')[0],
        thumbnail: data.thumbnail || null, // 2. 썸네일 경로 명시
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const fileStats = fs.statSync(fullPath);
  const { data, content } = matter(fileContents);

  return {
    ...data,
    id,
    content,
    title: data.title || id,
    date: data.date || fileStats.birthtime.toISOString().split('T')[0],
    thumbnail: data.thumbnail || null,
  };
}