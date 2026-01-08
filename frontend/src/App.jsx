import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [health, setHealth] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchHealth()
  }, [])

  const fetchHealth = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/health')
      const data = await response.json()
      setHealth(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h1>🚀 MERN Stack con Docker</h1>
      
      <div className="status">
        <h2>Estado del Backend</h2>
        {loading && <p>Cargando...</p>}
        {error && <p className="error">Error: {error}</p>}
        {health && (
          <div className="health-info">
            <p>✓ {health.status}</p>
            <p>Hora: {new Date(health.timestamp).toLocaleString()}</p>
          </div>
        )}
      </div>

      <button onClick={fetchHealth} className="btn">
        Verificar Estado
      </button>
    </div>
  )
}

export default App
