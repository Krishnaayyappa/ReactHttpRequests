import React, { useRef } from 'react';

import classes from './AddMovie.module.css';

function AddMovie(props) {
  const titleRef = useRef('');
  const directorRef = useRef('');
  const releaseDateRef = useRef('');

  function submitHandler(event) {
    event.preventDefault();

    // could add validation here...

    const movie = {
      title: titleRef.current.value,
      releaseDate: releaseDateRef.current.value,
      director: directorRef.current.value
    };

    props.onAddMovie(movie);
    
  }

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='title'>Title</label>
        <input type='text' id='title' ref={titleRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='date'>Release Date</label>
        <input type='text' id='date' ref={releaseDateRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='director'>Director</label>
        <input type='text' id='director' ref={directorRef} />
      </div>
      <button>Add Movie</button>
    </form>
  );
}

export default AddMovie;
