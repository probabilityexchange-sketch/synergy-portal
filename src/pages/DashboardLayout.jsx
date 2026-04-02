import Sidebar from '../components/layout/Sidebar'
import TopNav from '../components/layout/TopNav'
import MainContent from '../components/layout/MainContent'

export default function DashboardLayout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <TopNav />
        <MainContent>
          <h1>Dashboard</h1>
          <p>Motor Diagnostic Workflow - Stage 1</p>
        </MainContent>
      </div>
    </div>
  )
}
