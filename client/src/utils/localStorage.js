export const getSaveMovieTitle = () => {
  const saveMovie = localStorage.getItem('save_movie')
    ? JSON.parse(localStorage.getItem('save_movie'))
    : [];

  return saveMovie;
};

export const saveMovieTitle = (movieTitleArr) => {
  if (movieTitleArr.length) {
    localStorage.setItem('save_movie', JSON.stringify(movieTitleArr));
  } else {
    localStorage.removeItem('save_movie');
  }
};

export const removeMovieId = (title) => {
  const saveMovieTitle = localStorage.getItem('saved_movie')
    ? JSON.parse(localStorage.getItem('save_movie'))
    : null;

  if (!saveMovieTitle) {
    return false;
  }

  const updatedSaveMovieTitle= saveMovieTitle?.filter((saveMovieTitle) => saveMovieTitle !== title);
  localStorage.setItem('save_movie', JSON.stringify(updatedSaveMovieTitle));

  return true;
};
