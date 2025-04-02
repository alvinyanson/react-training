import { createFileRoute } from '@tanstack/react-router'
import { observer } from 'mobx-react-lite'
import WatchListCard from '@/components/watchlist-card'
import { WatchLater, watchListStore } from '@/store/watch-list-store'

export const RouteComponent = observer(() => {
  const filteredMovies = watchListStore.savedMovies.filter((watch: WatchLater) => watch.watched)

  const handleRemove = (watchLater: WatchLater) => {
    watchLater.toggleWatch()
    watchListStore.remove(watchLater.movie.id)
  }

  return (
    <>
      <h3>Watch Later</h3>
      <div className="row mt-4">
        {filteredMovies.map((movie) => (
          <div key={movie.movie.id} className="col-sm-6 col-md-4 col-lg-3 col-12 mb-4">
            <WatchListCard movie={movie} remove={() => handleRemove(movie)} />
          </div>
        ))}

        {filteredMovies.length <= 0 && (
          <h5 className="text-center text-muted mt-5">You dont have any watchlist...</h5>
        )}
      </div>
    </>
  )
})

export const Route = createFileRoute('/watchlist/')({
  component: RouteComponent,
})
