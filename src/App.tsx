import { Route } from 'react-router-dom'
import MovieList from './modules/movies/screens/MovieList'
import MovieDetail from './modules/movies/screens/MovieDetail'
import Layout from './components/shared/Layout'

function App() {
  return (
    <Layout>
      <Route path="/" element={<MovieList />} />
      <Route path="/movie/:id" element={<MovieDetail />} />
    </Layout>
  )
}

export default App
