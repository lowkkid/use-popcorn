import { useState, useRef, useEffect } from "react";
import { useKey } from "../hooks/useKey";
import StarRating from "./StarRating";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

import { useDocumentTilte } from "../hooks/useDocumentTitle";
import { useMovieDetails } from "../hooks/useMovieDetails";

export default function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWathcedMovie,
  watched,
}) {
  const [userRating, setUserRating] = useState("");

  const countRef = useRef(0);

  useEffect(
    function () {
      if (userRating) {
        countRef.current++;
      }
    },
    [userRating]
  );
  const { movie, isLoading, error } = useMovieDetails(selectedId);

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const previousRating = watched
    .slice()
    .filter((movie) => movie.imdbID === selectedId)
    .at(0)?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating: rating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(rating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      countRatingDesicions: countRef.current,
    };
    onAddWathcedMovie(newWatchedMovie);
    onCloseMovie();
  }

  useKey("Escape", onCloseMovie);
  useDocumentTilte(title ? `Movie | ${title}` : "");

  return (
    <div className="details">
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!isLoading && !error && (
        <>
          <header>
            <img src={poster} alt={`Poster of ${title}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span> {rating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>You rated this movie with a {previousRating} stars</p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
          <footer>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
          </footer>
        </>
      )}
    </div>
  );
}
