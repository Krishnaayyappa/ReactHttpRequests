import React, {useState,useEffect,useCallback} from 'react';

import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import './App.css';

function App() {
  // const dummyMovies = [
  //   {
  //     id: 1,
  //     title: 'Some Dummy Movie',
  //     openingText: 'This is the opening text of the movie',
  //     releaseDate: '2021-05-18',
  //   },
  //   {
  //     id: 2,
  //     title: 'Some Dummy Movie 2',
  //     openingText: 'This is the second opening text of the movie',
  //     releaseDate: '2021-05-19',
  //   },
  // ];

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null);

  // Syntax:1(using .then())

  // function fetchMoviesHandler(){
  //   fetch("https://swapi.dev/api/films/").then(response => {
  //     return response.json();
  //   }).then (data => {
  //     const transformedMovies = data.results.map(movie => {
  //       return {id:movie.episode_id,
  //         title:movie.title,
  //         releaseDate:movie.release_date,
  //         director:movie.director};
  //     });
  //     setMovies(transformedMovies);
  //   })
  // }

  //syntax:2 (using async-await)
  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://http-react-33a71-default-rtdb.firebaseio.com/movies.json");
      if (!response.ok){
        throw new Error("Somewthing went wrong!");
      }
      const data = await response.json();
      const movies = [];
      for (const key in data){
        movies.push({
          id:key,
          title:data[key].title,
          releaseDate:data[key].releaseDate,
          director:data[key].director

        });
      }
      setMovies(movies);
    } catch (error){
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

 

  async function addMovieHandler(movie){
    try{
      const response = await fetch("https://http-react-33a71-default-rtdb.firebaseio.com/movies.json", {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
        "Content-Type": "application/json"
        }
      });
      const data = await response.json();
      console.log(data);
    } catch(error){
      // setError(error.message);
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchMoviesHandler();
  }, []);



  // we can also write statements  and assign the element to be displayed in a variable 
  // based on the condition
  // example

  let content = <p>No movies were found</p>;

  if (movies.length > 0 ){
    content = <MoviesList movies={movies} />;
  }

  if (error){
    content = <p>{error}</p>
  }

  if (isLoading){
    content = <p>Loading...</p>
  }


  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie = {addMovieHandler}/>
      </section>
      <section>
        <button onClick = {fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {/* {!isLoading && movies.length >0 && <MoviesList movies={movies} />}
        {isLoading && <p>Loading...</p>}
        {!isLoading && movies.length === 0 && !error && <p>No movies were found</p>}
        {!isLoading && error && <p>{error}</p>} */ content}
      </section>
    </React.Fragment>
  );
}


export default App;
