import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import MovieInfo from '../MovieInfo'

const mockMovieInfo = {
  title: 'Runtime',
  desc: '127 minutes',
}

describe('MovieInfo', () => {
  it('renders movie info correctly', () => {
    render(<MovieInfo title={mockMovieInfo.title} desc={mockMovieInfo.desc} />)

    expect(screen.getByText(mockMovieInfo.title)).toBeInTheDocument()
    expect(screen.getByText(mockMovieInfo.desc)).toBeInTheDocument()
  })
})
