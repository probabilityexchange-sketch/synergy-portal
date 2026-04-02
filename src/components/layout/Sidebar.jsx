export default function Sidebar() {
  return (
    <aside style={{ width: '250px', background: '#1e293b', color: 'white', height: '100vh', padding: '20px' }}>
      <h2 style={{ marginBottom: '20px', fontSize: '1.2rem' }}>Motor #123</h2>
      <nav>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {['Dashboard', 'Work Orders', 'Inventory', 'Reports', 'Profile'].map((item) => (
            <li key={item} style={{ padding: '10px 0', cursor: 'pointer' }}>{item}</li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
