import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// process.cwd()가 가끔 엉뚱한 곳을 가리킬 때가 있습니다. 
// 현재 실행 중인 파일의 위치를 기준으로 content 폴더를 찾게 만듭니다.
const postsDirectory = path.join(process.cwd(), 'content');

export function getAllPosts() {
  // 폴더가 진짜 있는지 확인해봅니다.
  if (!fs.existsSync(postsDirectory)) {
    console.error("🔴 에러: content 폴더가 없습니다! 경로를 확인하세요:", postsDirectory);
    return [];
  }
  
  const fileNames = fs.readdirSync(postsDirectory);
  // ... (나머지 코드는 동일)
  return fileNames.filter(f => f.endsWith('.md')).map(fileName => {
    const id = fileName.replace(/\.md$/, '');
    const fileContents = fs.readFileSync(path.join(postsDirectory, fileName), 'utf8');
    const { data } = matter(fileContents);
    return { id, title: data.title, date: data.date };
  });
}

export function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  
  // 🔍 여기가 핵심입니다. 터미널에 찍히는 이 경로를 메모장 주소창에 복사했을 때 파일이 열려야 합니다.
  console.log("-----------------------------------------");
  console.log("📂 서버가 파일을 찾는 위치:", fullPath);
  console.log("-----------------------------------------");

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  return { id, content, title: data.title, date: data.date };
}


