import { FALLBACK_IMAGE, IMAGE_CDN } from '../api/movie.service';
import { WatchLater } from '../store/watch-list-store';

type Props = {
  movie: WatchLater;
  remove: () => void;
};

function WatchListCard({ movie, remove }: Props) {
  return (
    <>
      <div className="card">
        {/* movie cover image */}
        <img
          src={`${movie.movie.backdrop_path === null ? FALLBACK_IMAGE : `${IMAGE_CDN + movie.movie.backdrop_path}`}`}
          className="card-img-top"
          alt={movie.movie.title}
        />

        {/* movie info */}
        <div className="card-body">
          <h6 className="card-title text-truncate">{movie.movie.title}</h6>
          {/* <h4 className="mb-4">{formatNumberWithCommas(product.price)}</h4> */}

          {/* watch later button */}
          <button onClick={remove} className="btn btn-light mt-3">
            Remove
          </button>
        </div>
      </div>
    </>
  );
}

export default WatchListCard;
