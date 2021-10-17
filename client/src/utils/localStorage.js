export const getSavedMovieIds = () => {
  const savedMovieIds = localStorage.getItem('save_movie')
    ? JSON.parse(localStorage.getItem('save_movie'))
    : [];

  return savedMovieIds;
};

export const saveMovieIds = (movieIdArr) => {
  if (movieIdArr.length) {
    localStorage.setItem('save_movie', JSON.stringify(movieIdArr));
  } else {
    localStorage.removeItem('save_movie');
  }
};

export const removeMovieId = (movieId) => {
  const savedMovieIds = localStorage.getItem('save_movie')
    ? JSON.parse(localStorage.getItem('save_movie'))
    : null;

  if (!savedMovieIds) {
    return false;
  }

  const updatedsavedMovieIds= savedMovieIds?.filter((savedMovieId) => savedMovieId !== movieId);
  localStorage.setItem('save_movie', JSON.stringify(updatedsavedMovieIds));

  return true;
};
