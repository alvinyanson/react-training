import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { fetchMovies } from '../api/movie.service';
import MovieCard from '../components/movie-card';
import { Movie } from '../types/movie';
import { useState } from 'react';

type ProductSearch = {
  page: number;
};

export const Route = createFileRoute('/')({
  component: Index,
  validateSearch: (search: Record<string, unknown>): ProductSearch => {
    // validate and parse the search params into a typed state
    return {
      page: Number(search?.page ?? 1),
    };
  },
  loaderDeps: ({ search: { page } }) => ({ page }),
  loader: async ({ deps: { page } }) => {
    return await fetchMovies(page);
  },
});

function Index() {
  const response = Route.useLoaderData();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const handleNextPage = () => {
    setPage(page + 1);

    navigate({ search: { page: page + 1 } });
  };

  const handlePrevPage = () => {
    if (page === 1) return;

    setPage(page - 1);
    navigate({ search: { page: page - 1 } });

  };

  return (
    <div className="p-2">
      <div className="d-flex justify-content-between">
        <h3>Hello!</h3>
        <div className="btn-group" role="group">
          <button
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
          </button>
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
