import { FALLBACK_IMAGE, IMAGE_CDN } from '@/api/movie.service'
import { WatchLater, watchListStore } from '@/store/watch-list-store'
import { Movie } from '@/type/movie'

type MovieCardProps = {
  movie: Movie
}

function MovieCard({ movie }: MovieCardProps) {
  const handleSave = (movie: Movie) => {
    const watchLater = new WatchLater(movie)
    // set 'watched' to true;
    watchLater.toggleWatch()
    // save to watchlist
    watchListStore.save(watchLater)
  }

  return (
    <>
      <div className="card text-white border-0">
        {/* movie cover image */}
        <img
          src={`${movie.backdrop_path === null ? FALLBACK_IMAGE : `${IMAGE_CDN + movie.backdrop_path}`}`}
          className="card-img-top"
          alt={movie.title}
        />

        {/* movie info */}
        <div className="card-img-overlay">
          <div className="d-flex flex-column py-4">
            <h6 className="card-title text-truncate">{movie.title}</h6>
            {/* <h4 className="mb-4">{formatNumberWithCommas(product.price)}</h4> */}

            {/* watch later button */}
            <div>
              <button onClick={() => handleSave(movie)} className="btn btn-success btn-sm mt-3">
                Watch Later
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MovieCard
