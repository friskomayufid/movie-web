import { Route } from 'react-router-dom'
import MovieList from './components/MovieList'
import MovieDetail from './components/MovieDetail'
import Layout from './components/common/Layout'

function App() {
  return (
    <Layout>
      <Route path="/" element={<MovieList />} />
      <Route path="/movie/:id" element={<MovieDetail />} />
    </Layout>
  )
}

export default App
