import { createFileRoute } from '@tanstack/react-router';
import { observer } from 'mobx-react-lite';
import WatchListCard from '../../components/watchlist-card';
import { WatchLater, watchList } from '../../store/watch-list-store';

export const RouteComponent = observer(() => {
  
  const filteredMovies = watchList.savedMovies.filter(
    (watch: WatchLater) => watch.watched
  );

  const handleRemove = (watchLater: WatchLater) => {
    watchLater.toggleWatch();
    watchList.remove(watchLater.movie.id);
  };

  return (
    <>
      <div className="row mt-4">
        <h3>Watch Later</h3>

        {filteredMovies.map((movie) => (
          <div
            key={movie.movie.id}
            className="col-sm-6 col-md-4 col-lg-3 col-12 mb-4"
          >
            <WatchListCard movie={movie} remove={() => handleRemove(movie)} />
          </div>
        ))}
      </div>
    </>
  );
});

export const Route = createFileRoute('/watchlist/')({
  component: RouteComponent,
});
