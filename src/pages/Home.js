import React, { useContext } from "react";
import { MovieContext } from "../MovieContext";

function Home() {
  const { movies } = useContext(MovieContext);
  return (
    <>
      <section>
        <h1>Daftar Film Terbaik</h1>
        <div id="article-list">
          {movies !== null &&
            movies.map((movie) => (
              <div className="article" key={movie.id}>
                <a href=".">
                  <h3>{movie.title}</h3>
                </a>
                <p>
                  <b>Rating {movie.rating}</b>
                </p>
                <p>
                  <b>Durasi : {movie.duration / 60}</b>
                </p>
                <p>
                  <b>Genre : {movie.genre}</b>
                </p>
                <br />
                <div>
                  <p>Deskripsi : {movie.description}</p>
                </div>
              </div>
            ))}
        </div>
      </section>
      <footer>
        <h5>copyright &copy; 2020 by Sanbercode</h5>
      </footer>
    </>
  );
}

export default Home;
