import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { fetchMovies } from '../api/movie.service';
import MovieCard from '../components/movie-card';
import { Movie } from '../types/movie';

export const Route = createFileRoute('/')({
  component: Index,
  loader: () => fetchMovies(),
});

function Index() {
  const response = Route.useLoaderData();
  const [page, setPage] = useState(1);

  const handleNextPage = () => {
    setPage(page + 1);

  };

  const handlePrevPage = () => {
    if (page === 1) return;

    setPage(page - 1);
  };

  return (
    <div className="p-2">
      <div className="d-flex justify-content-between">
        <h3>Hello!</h3>
        <div className="btn-group" role="group">
          {/* <button
            type="button"
            onClick={handlePrevPage}
            className="btn btn-dark"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={handleNextPage}
            className="btn btn-dark"
          >
            Next
          </button> */}
        </div>
      </div>
      <div className="row mt-4">
        {response.results.map((movie: Movie) => (
          <div
            className="col-sm-6 col-md-4 col-lg-3 col-12 mb-4"
            key={movie.id}
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
}
