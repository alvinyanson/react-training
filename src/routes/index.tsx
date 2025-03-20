import { createFileRoute } from '@tanstack/react-router';
import { fetchMovies } from '../api/movie.service';
import MovieCard from '../components/movie-card';
import { Movie } from '../types/movie';

export const Route = createFileRoute('/')({
  component: Index,
  loader: () => fetchMovies(),
});

function Index() {
  const response = Route.useLoaderData();

  return (
    <div className="p-2">
      <h3>Hello!</h3>
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
