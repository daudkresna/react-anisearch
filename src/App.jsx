import { useState, useEffect } from "react";
import axios from "axios";
import { getAnimes } from "./api";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [movies, setMovies] = useState([]);
  const [animeName, setAnimeName] = useState("");

  useEffect(() => {
    getAnimes(animeName).then((results) => {
      setMovies(results);
    });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    getAnimes(animeName).then((results) => {
      setMovies(results);
      setAnimeName("");
    });
  }

  return (
    <>
      <div className="container min-h-screen bg-sky-600 w-full mx-auto">
        <SearchBar
          animeName={animeName}
          setAnimeName={setAnimeName}
          handleSubmit={handleSubmit}
        />
        <MoviesList moviesData={movies} />
      </div>
    </>
  );
}

function SearchBar({ animeName, setAnimeName, handleSubmit }) {
  return (
    <>
      <form
        className="flex flex-col items-center justify-center my-4"
        action=""
        onSubmit={handleSubmit}
      >
        <label className="mt-4 font-bold text-2xl" htmlFor="search">
          Search Your Favorite Anime
        </label>
        <div className="mt-4">
          <input
            className="bg-blue-100 w-60 mr-4 p-2 rounded-sm placeholder:italic placeholder:pl-2"
            type="text"
            placeholder="input your anime"
            name="search"
            id="search"
            value={animeName}
            onChange={(e) => setAnimeName(e.target.value)}
          />
          <button className="bg-slate-400 p-2 font-bold rounded-md transition ease-in-out duration-300 hover:bg-slate-500 hover:text-neutral-200" onSubmit={handleSubmit}>Search Movie</button>
        </div>
      </form>
    </>
  );
}

function MoviesList({ moviesData }) {
  const listMovies = moviesData.map((movie, id) => (
    <li className="m-2 bg-red-400 w-60 rounded-lg cursor-pointer transition ease-in-out duration-300 hover:text-neutral-200 hover:drop-shadow-lg" key={id}>
      <h1 className="text-center font-bold p-2 truncate">{movie.title} </h1>
      <img
        className="p-2 h-96 w-full mx-auto"
        src={movie.images.jpg.image_url}
        alt={movie.title}
      />
      <p className="text-center font-semibold p-2">Rating : {movie.score}</p>
    </li>
  ));

  return (
    <ul>
      <div className="flex flex-wrap justify-center p-4">{listMovies}</div>
    </ul>
  );
}

export default App;
