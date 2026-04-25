import { Routes, Route } from 'react-router-dom'
import Home from '@/pages/Home'
import PoolDetail from '@/pages/PoolDetail'
import CreatePool from '@/pages/CreatePool'
import Dashboard from '@/pages/Dashboard'

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pool/:id" element={<PoolDetail />} />
        <Route path="/create" element={<CreatePool />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App
