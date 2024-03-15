import { useState, useEffect } from "react";
import axios from "axios";
import { getAnimes } from "./api";
import Modal from "./modal"
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [animeName, setAnimeName] = useState("");

  useEffect(() => {
    getAnimes(animeName).then((results) => {
      results.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
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
      <div className="container min-h-screen bg-sky-600 w-full mx-auto overflow-auto">
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
        className="pb-4 flex flex-col items-center justify-center my-4 w-full bg-sky-800 shadow-2xl"
        action=""
        onSubmit={handleSubmit}
      >
        <label className="mt-4 font-bold text-2xl text-neutral-300" htmlFor="search">
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
  const [modalOpen, setmodalOpen] = useState(false)
  const [posTop, setPosTop] = useState("")
  const [selectedAnime, setSelectedAnime] = useState([])

  function handleSelectedAnime(movie, e) {
    (!modalOpen) ? setmodalOpen(true) : setmodalOpen(false)
    console.log(e)
    setPosTop(e)
    setSelectedAnime(movie)
  }

  const listMovies = moviesData.map((movie, id) => (
    <li className="m-2 bg-sky-800 w-60 rounded-lg cursor-pointer transition ease-in-out duration-300 hover:text-neutral-200 hover:shadow-lg hover:shadow-black" key={id} onClick={(e) => handleSelectedAnime(movie, e.target.offsetTop)}>
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
      <div className="flex flex-wrap justify-center p-4 relative">{listMovies}
      <Modal selectedAnime={selectedAnime} modalOpen={modalOpen} handleSelectedAnime={handleSelectedAnime} posTop={posTop}/>
      </div>
    </ul>
  );
}

export default App;
