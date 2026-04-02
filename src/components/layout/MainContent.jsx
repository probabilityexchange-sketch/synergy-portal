export default function MainContent({ children }) {
  return (
    <main style={{ padding: '20px', flexGrow: 1 }}>
      {children}
    </main>
  );
}
