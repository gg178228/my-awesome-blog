import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body style={{ backgroundColor: 'black', margin: 0, padding: 0 }}>
        {/* text-align: center는 모든 자식 요소를 일단 가운데로 몰아넣습니다 */}
        <div style={{ width: '100%', textAlign: 'center' }}>
          {children}
        </div>
      </body>
    </html>
  );
}