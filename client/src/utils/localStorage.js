export const getSaveMovieIds = () => {
  const saveMovieIds = localStorage.getItem('save_movie')
    ? JSON.parse(localStorage.getItem('save_movie'))
    : [];

  return saveMovieIds;
};

export const saveMovieIds = (movieIdArr) => {
  if (movieIdArr.length) {
    localStorage.setItem('save_movie', JSON.stringify(movieIdArr));
  } else {
    localStorage.removeItem('save_movie');
  }
};

export const removeMovieId = (movieId) => {
  const savedMovieIds = localStorage.getItem('saved_movie')
    ? JSON.parse(localStorage.getItem('save_movie'))
    : null;

  if (!saveMovieIds) {
    return false;
  }

  const updatedSaveMovieIds = saveMovieIds?.filter((saveMovieId) => saveMovieId !== movieId);
  localStorage.setItem('save_movie', JSON.stringify(updatedSaveMovieIds));

  return true;
};
