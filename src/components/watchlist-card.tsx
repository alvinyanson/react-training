import { FALLBACK_IMAGE, IMAGE_CDN } from '../api/movie.service'
import { WatchLater } from '../store/watch-list-store'

type Props = {
  movie: WatchLater
  remove: () => void
}

function WatchListCard({ movie, remove }: Props) {
  return (
    <>
      <div className="card text-white border-0">
        {/* movie cover image */}
        <img
          src={`${movie.movie.backdrop_path === null ? FALLBACK_IMAGE : `${IMAGE_CDN + movie.movie.backdrop_path}`}`}
          className="card-img-top"
          alt={movie.movie.title}
        />

        {/* movie info */}
        <div className="card-img-overlay">
          <div className="d-flex flex-column py-4">
            <h6 className="card-title text-truncate">{movie.movie.title}</h6>

            {/* remove button */}
            <div>
              <button onClick={remove} className="btn btn-danger btn-sm mt-3">
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default WatchListCard
