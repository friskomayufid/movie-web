import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { MemoryRouter } from "react-router-dom"
import MovieCard from "../MovieCard"

const mockMovie = {
  id: 1,
  title: "Test Movie",
  posterPath: "/test-poster.jpg",
  releaseYear: "2024",
}

const renderWithRouter = (component: React.ReactElement) => {
  return render(<MemoryRouter>{component}</MemoryRouter>)
}

describe("MovieCard", () => {
  it("renders movie information correctly", () => {
    renderWithRouter(
      <MovieCard
        id={mockMovie.id}
        title={mockMovie.title}
        posterPath={mockMovie.posterPath}
        releaseYear={mockMovie.releaseYear}
      />
    )

    expect(screen.getByText(mockMovie.title)).toBeInTheDocument()
    expect(screen.getByText(mockMovie.releaseYear)).toBeInTheDocument()
    expect(screen.getByAltText(`${mockMovie.title} poster`)).toBeInTheDocument()
  })

  it("uses placeholder image when posterPath is empty", () => {
    renderWithRouter(
      <MovieCard
        id={mockMovie.id}
        title={mockMovie.title}
        posterPath=""
        releaseYear={mockMovie.releaseYear}
      />
    )

    const img = screen.getByAltText(`${mockMovie.title} poster`)
    expect(img).toHaveAttribute("src", "/placeholder-poster.jpg")
  })
})
