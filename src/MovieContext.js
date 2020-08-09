import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const MovieContext = createContext();

export const MovieProvider = (props) => {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `http://backendexample.sanbercloud.com/api/movies`
      );
      setMovies(result.data);
      console.log(result.data);
    };
    if (movies === null) {
      fetchData();
    }
  }, [movies]);

  return (
    <MovieContext.Provider
      value={{
        movies,
        setMovies,
      }}
    >
      {props.children}
    </MovieContext.Provider>
  );
};
