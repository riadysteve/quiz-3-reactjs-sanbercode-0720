import React, { useState, useContext } from "react";
import { MovieContext } from "../MovieContext";
import "./MovieList.css";
import axios from "axios";

function MovieList() {
  const { movies, setMovies } = useContext(MovieContext);
  const [indexofForm, setIndexofForm] = useState(0);
  const [statusForm, setStatusForm] = useState("create");
  const [input, setInput] = useState({
    title: "",
    description: "",
    year: 0,
    duration: 0,
    genre: "",
    rating: 0,
  });

  const handleDelete = (e) => {
    let ID_MOVIES = parseInt(e.target.value);
    let updatedData = movies.filter((movie) => movie.id !== ID_MOVIES);

    axios
      .delete(`http://backendexample.sanbercloud.com/api/movies/${ID_MOVIES}`)
      .then((res) => {
        console.log(res.data);
      });

    setMovies([...updatedData]);
  };

  const handleEdit = (e) => {
    let index = parseInt(e.target.value);
    console.log(movies);
    let dataEdit = movies.find((movie) => movie.id === index);
    console.log(dataEdit);
    // console.log(data.find((item) => item.id === index));
    // console.log(index);
    setInput({
      ...input,
      title: dataEdit.title,
      description: dataEdit.description,
      year: dataEdit.year,
      duration: dataEdit.duration,
      genre: dataEdit.genre,
      rating: dataEdit.rating,
    });
    setIndexofForm(index);
    setStatusForm("edit");
  };

  const handleChange = (event) => {
    let typeOfInput = event.target.name;
    switch (typeOfInput) {
      case "title": {
        setInput({ ...input, title: event.target.value });
        break;
      }
      case "description": {
        setInput({ ...input, description: event.target.value });
        break;
      }
      case "year": {
        setInput({ ...input, year: event.target.value });
        break;
      }
      case "duration": {
        setInput({ ...input, duration: event.target.value });
        break;
      }
      case "genre": {
        setInput({ ...input, genre: event.target.value });
        break;
      }
      case "rating": {
        setInput({ ...input, rating: event.target.value });
        break;
      }

      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let index = indexofForm;
    // console.log(index);
    let title = input.title;
    let description = input.description;
    let year = parseInt(input.year);
    let duration = parseInt(input.duration);
    let genre = input.genre;
    let rating = parseInt(input.rating);

    if (
      title.replace(/\s/g, "") !== "" &&
      description.replace(/\s/g, "") !== ""
    ) {
      if (statusForm === "create") {
        axios
          .post(`http://backendexample.sanbercloud.com/api/movies`, {
            title: title,
            description: description,
            year: year,
            duration: duration,
            genre: genre,
            rating: rating,
          })
          .then((res) => {
            setMovies([
              ...movies,
              {
                id: res.data.id,
                title: title,
                description: description,
                year: year,
                duration: duration,
                genre: genre,
                rating: rating,
              },
            ]);
            // console.log(foodData);
          });
      } else if (statusForm === "edit") {
        axios
          .put(`http://backendexample.sanbercloud.com/api/movies/${index}`, {
            title: title,
            description: description,
            year: year,
            duration: duration,
            genre: genre,
            rating: rating,
          })
          .then((res) => {
            let updatedData = movies.find((movie) => movie.id === index);
            console.log(updatedData);
            updatedData.title = input.title;
            updatedData.description = input.description;
            updatedData.year = parseInt(input.year);
            updatedData.duration = parseInt(input.duration);
            updatedData.genre = input.genre;
            updatedData.rating = parseInt(input.rating);
            setMovies([...movies]);
          });
      }
    }

    setStatusForm("create");
    setIndexofForm(0);
    setInput({
      title: "",
      description: "",
      year: 0,
      duration: 0,
      genre: "",
      rating: 0,
    });
  };

  return (
    <div className="movie-list">
      <h1>Tabel Movies</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Tahun</th>
            <th>Durasi</th>
            <th>Genre</th>
            <th>Rating</th>
            <th>Deskripsi</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {movies !== null &&
            movies.map((movie) => {
              return (
                <tr key={movie.id}>
                  <td>{movie.title}</td>
                  <td>{movie.year}</td>
                  <td>{movie.duration / 60}</td>
                  <td>{movie.genre}</td>
                  <td>{movie.rating}</td>
                  <td>{movie.description}</td>
                  <td>
                    <button value={movie.id} onClick={handleEdit}>
                      Edit
                    </button>
                    <button
                      className="del"
                      value={movie.id}
                      onClick={handleDelete}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      {/* Form */}
      <h3>Tambah Data</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Masukkan Title</label>
          <input
            type="text"
            name="title"
            value={input.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Masukkan Tahun Film</label>
          <input
            type="text"
            name="year"
            value={input.year}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Masukkan Durasi Film</label>
          <input
            type="text"
            name="duration"
            value={input.duration}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Masukkan Genre Film</label>
          <input
            type="text"
            name="genre"
            value={input.genre}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Masukkan Rating Film</label>
          <input
            type="number"
            name="rating"
            min="0"
            max="10"
            value={input.rating}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Masukkan Deskripsi Film</label>
          <textarea
            name="description"
            value={input.description}
            onChange={handleChange}
            cols="30"
            rows="10"
          ></textarea>
        </div>
        <button className="submit">Tambah Data</button>
      </form>
    </div>
  );
}

export default MovieList;
